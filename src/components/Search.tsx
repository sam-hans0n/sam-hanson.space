import Fuse from "fuse.js";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Card from "@components/Card";
import type { CollectionEntry } from "astro:content";

export type SearchItem = {
  title: string;
  description: string;
  body: string;
  tags: string[];
  data: CollectionEntry<"blog">["data"];
  slug: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const deferredInputVal = useDeferredValue(inputVal.trim());
  const [initialized, setInitialized] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: [
          { name: "title", weight: 4 },
          { name: "tags", weight: 3 },
          { name: "description", weight: 2 },
          { name: "body", weight: 1 },
        ],
        ignoreLocation: true,
        ignoreFieldNorm: true,
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.3,
      }),
    [searchList]
  );

  const searchResults: SearchResult[] = useMemo(() => {
    if (deferredInputVal.length < 2) return [];
    // Identifiers must match exactly: a nearby CVE number is a different finding.
    if (/^CVE-\d{4}-\d{4,}$/i.test(deferredInputVal)) {
      const identifier = deferredInputVal.toLowerCase();
      return searchList.flatMap((item, refIndex) => {
        const identifiers: string[] =
          `${item.title} ${item.description} ${item.body}`
            .toLowerCase()
            .match(/\bcve-\d{4}-\d{4,}\b/g) ?? [];
        return identifiers.includes(identifier) ? [{ item, refIndex }] : [];
      });
    }
    return fuse.search(deferredInputVal);
  }, [deferredInputVal, fuse, searchList]);

  useEffect(() => {
    const readQuery = () => {
      setInputVal(new URLSearchParams(window.location.search).get("q") ?? "");
      setInitialized(true);
    };
    readQuery();
    window.addEventListener("popstate", readQuery);
    return () => window.removeEventListener("popstate", readQuery);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    const url = new URL(window.location.href);
    if (inputVal.trim()) url.searchParams.set("q", inputVal);
    else url.searchParams.delete("q");
    history.replaceState(
      history.state,
      "",
      url.pathname + url.search + url.hash
    );
  }, [inputVal, initialized]);

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
          <span className="sr-only">Search</span>
        </span>
        <input
          className="block w-full rounded border border-skin-fill 
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75 
        focus:border-skin-accent focus:outline-none"
          placeholder="Search for anything..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          aria-describedby="search-status"
          ref={inputRef}
        />
      </label>

      <div id="search-status" role="status" aria-live="polite" className="mt-6">
        {deferredInputVal.length > 1
          ? `Found ${searchResults.length} ${searchResults.length === 1 ? "result" : "results"} for “${deferredInputVal}”`
          : "Search titles, topics, article text, or a CVE ID (at least 2 characters)."}
        {deferredInputVal.length > 1 && searchResults.length === 0 && (
          <p className="mt-2">Try a malware name, vendor, or broader topic.</p>
        )}
      </div>

      <ul>
        {searchResults.map(({ item, refIndex }) => (
          <Card
            href={`/posts/${item.slug}/`}
            frontmatter={item.data}
            key={`${refIndex}-${item.slug}`}
          />
        ))}
      </ul>
    </>
  );
}
