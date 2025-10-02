import { Fragment, useMemo } from 'react';

// Lightweight Markdown renderer for common elements (headings, lists, code blocks, paragraphs, links)
export function useMarkdown(md: string) {
    return useMemo(() => {
        const lines = md.replace(/\r\n/g, '\n').split('\n');
        const elements: JSX.Element[] = [];
        let i = 0;
        let inCode = false;
        let codeLang = '';
        let codeBuffer: string[] = [];
        let listBuffer: string[] = [];

        const flushList = () => {
            if (listBuffer.length) {
                elements.push(
                    <ul className="my-4 list-disc pl-6" key={`ul-${elements.length}`}>
                        {listBuffer.map((item, idx) => (
                            <li className="leading-7" key={`li-${elements.length}-${idx}`}>
                                {inline(item)}
                            </li>
                        ))}
                    </ul>,
                );
                listBuffer = [];
            }
        };

        const flushCode = () => {
            if (codeBuffer.length) {
                elements.push(
                    <pre key={`code-${elements.length}`} className="my-4 overflow-x-auto rounded-md bg-neutral-900/90 p-4 text-neutral-100 dark:bg-neutral-900">
                        <code className={`language-${codeLang}`}>{codeBuffer.join('\n')}</code>
                    </pre>,
                );
                codeBuffer = [];
                codeLang = '';
            }
        };

        const heading = (text: string, level: number) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            const sizes = {
                1: 'mt-10 scroll-mt-24 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100',
                2: 'mt-8 scroll-mt-24 text-2xl font-semibold text-neutral-900 dark:text-neutral-100',
                3: 'mt-6 scroll-mt-24 text-xl font-semibold text-neutral-900 dark:text-neutral-100',
                4: 'mt-4 scroll-mt-24 text-lg font-semibold text-neutral-900 dark:text-neutral-100',
                5: 'mt-4 scroll-mt-24 text-base font-semibold text-neutral-900 dark:text-neutral-100',
                6: 'mt-4 scroll-mt-24 text-sm font-semibold text-neutral-900 dark:text-neutral-100',
            } as const;
            return <Tag className={sizes[level]}>{inline(text)}</Tag>;
        };

        const paragraph = (text: string) => (
            <p className="my-3 leading-7 text-neutral-700 dark:text-neutral-300">{inline(text)}</p>
        );

        const linkify = (text: string): (string | JSX.Element)[] => {
            const parts: (string | JSX.Element)[] = [];
            let lastIndex = 0;
            const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
            let match: RegExpExecArray | null;
            while ((match = regex.exec(text)) !== null) {
                const [full, label, href] = match;
                if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
                parts.push(
                    <a
                        key={`${href}-${match.index}`}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                    >
                        {label}
                    </a>,
                );
                lastIndex = match.index + full.length;
            }
            if (lastIndex < text.length) parts.push(text.slice(lastIndex));
            return parts;
        };

        const emStrong = (text: string): (string | JSX.Element)[] => {
            // bold
            const boldRegex = /\*\*([^*]+)\*\*/g;
            const italicRegex = /(^|\W)\*([^*]+)\*/g;
            const codeRegex = /`([^`]+)`/g;

            const apply = (input: (string | JSX.Element)[], regex: RegExp, wrap: (s: string, k: number) => JSX.Element) => {
                const out: (string | JSX.Element)[] = [];
                input.forEach((chunk) => {
                    if (typeof chunk !== 'string') {
                        out.push(chunk);
                        return;
                    }
                    let last = 0;
                    let m: RegExpExecArray | null;
                    while ((m = regex.exec(chunk)) !== null) {
                        const [full, inner] = m;
                        if (m.index > last) out.push(chunk.slice(last, m.index));
                        out.push(wrap(inner, m.index));
                        last = m.index + full.length;
                    }
                    if (last < chunk.length) out.push(chunk.slice(last));
                });
                return out;
            };

            let parts: (string | JSX.Element)[] = [text];
            parts = apply(parts, codeRegex, (s, k) => (
                <code key={`i-${k}`} className="rounded bg-neutral-200 px-1 py-0.5 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100">
                    {s}
                </code>
            ));
            parts = apply(parts, boldRegex, (s, k) => (
                <strong key={`b-${k}`} className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {s}
                </strong>
            ));
            parts = apply(parts, italicRegex, (s, k) => (
                <em key={`e-${k}`} className="italic">
                    {s}
                </em>
            ));
            return parts;
        };

        const inline = (text: string) => emStrong(linkify(text));

        while (i < lines.length) {
            const line = lines[i];

            // code block start/end
            const fence = line.match(/^```(.*)$/);
            if (fence) {
                if (!inCode) {
                    flushList();
                    inCode = true;
                    codeLang = fence[1] || '';
                    codeBuffer = [];
                } else {
                    flushCode();
                    inCode = false;
                }
                i++;
                continue;
            }

            if (inCode) {
                codeBuffer.push(line);
                i++;
                continue;
            }

            // lists
            const li = line.match(/^\s*[-*+]\s+(.*)$/);
            if (li) {
                listBuffer.push(li[1]);
                i++;
                // if next line not a list or eof, flush
                const next = lines[i] ?? '';
                if (!/^\s*[-*+]\s+/.test(next)) {
                    flushList();
                }
                continue;
            }

            // headings
            const h = line.match(/^(#{1,6})\s+(.+)$/);
            if (h) {
                flushList();
                elements.push(
                    <Fragment key={`h-${elements.length}`}>{heading(h[2].trim(), h[1].length)}</Fragment>,
                );
                i++;
                continue;
            }

            // horizontal rule
            if (/^\s*([-*_]){3,}\s*$/.test(line)) {
                flushList();
                elements.push(<hr key={`hr-${elements.length}`} className="my-6 border-neutral-200 dark:border-neutral-800" />);
                i++;
                continue;
            }

            // empty line makes new paragraph separation
            if (line.trim() === '') {
                flushList();
                elements.push(<div key={`sp-${elements.length}`} className="h-2" />);
                i++;
                continue;
            }

            // default paragraph
            flushList();
            elements.push(
                <Fragment key={`p-${elements.length}`}>{paragraph(line)}</Fragment>,
            );
            i++;
        }

        // final flush
        flushList();
        flushCode();

        return elements;
    }, [md]);
}

// Extract a user-friendly highlight list (features & fixes) from the most recent version section
export function useHighlights(md: string) {
    return useMemo(() => {
        const lines = md.replace(/\r\n/g, '\n').split('\n');
        // Find first version header (## or ###) after the main title
        let start = -1;
        for (let idx = 0; idx < lines.length; idx++) {
            if (/^##\s+/.test(lines[idx]) || /^###\s+/.test(lines[idx])) {
                start = idx;
                break;
            }
        }
        if (start === -1) return { added: [], fixed: [], other: [] as string[] };

        const added: string[] = [];
        const fixed: string[] = [];
        const other: string[] = [];

        for (let i = start + 1; i < lines.length; i++) {
            const line = lines[i];
            if (/^##\s+/.test(line) || /^###\s+/.test(line)) break; // stop at next version
            const m = line.match(/^\s*[-*+]\s+(.*)$/);
            if (m) {
                const text = m[1];
                if (/\b(add|added|feature|feat)\b/i.test(text)) added.push(text);
                else if (/\b(fix|fixed|bug|patch)\b/i.test(text)) fixed.push(text);
                else other.push(text);
            }
        }

        return { added, fixed, other };
    }, [md]);
}
