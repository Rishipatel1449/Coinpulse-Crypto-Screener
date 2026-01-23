'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { searchCoins } from '@/lib/coingecko.actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchCoin[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const debouncedQuery = useDebounce(query, 500);

    const openModal = () => {
        setIsOpen(true);
        // Focus input after modal opens
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const closeModal = () => {
        setIsOpen(false);
        setQuery('');
        setResults([]);
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const coins = await searchCoins(debouncedQuery);
                setResults(coins);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (coinId: string) => {
        router.push(`/coins/${coinId}`);
        closeModal();
    };

    return (
        <>
            <button onClick={openModal} className="nav-link flex items-center gap-2">
                <SearchIcon size={20} />
                <span className="hidden md:inline">Search</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm">
                    <div
                        ref={modalRef}
                        className="w-full max-w-lg bg-[#0b1116] border border-[#1a2332] rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    >
                        <div className="relative border-b border-[#1a2332] p-4 flex items-center gap-3">
                            <SearchIcon className="text-gray-400" size={20} />
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Search coins..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-500 h-auto p-0 text-lg"
                            />
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-500">Searching...</div>
                            ) : results.length > 0 ? (
                                <ul>
                                    {results.map((coin) => (
                                        <li key={coin.id}>
                                            <button
                                                onClick={() => handleSelect(coin.id)}
                                                className="w-full text-left p-3 hover:bg-[#1a2332] flex items-center gap-3 transition-colors"
                                            >
                                                <Image
                                                    src={coin.thumb}
                                                    alt={coin.name}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-white">{coin.name}</span>
                                                    <span className="text-sm text-gray-500 uppercase">{coin.symbol}</span>
                                                </div>
                                                {coin.market_cap_rank && (
                                                    <span className="ml-auto text-xs text-gray-600 bg-[#151c24] px-2 py-1 rounded">
                                                        #{coin.market_cap_rank}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : query.length > 0 ? (
                                <div className="p-4 text-center text-gray-500">No results found.</div>
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    Type to search for coins...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
