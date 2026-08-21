import type { ReactNode } from 'react';

/**
 * Card media. There are no screenshots for this work — two projects are command
 * line tools and two are internal platforms — so each card shows a small
 * artifact drawn from what the project actually produces: a directory tree, an
 * HTTP exchange, a service map, a paginated response.
 *
 * Decorative only: every card repeats the same information as prose below, and
 * these blocks are hidden from assistive technology.
 */

const Dir = ({ children }: { children: ReactNode }) => (
  <span className="text-cyan-brand">{children}</span>
);
const Faint = ({ children }: { children: ReactNode }) => (
  <span className="text-ink-faint/70">{children}</span>
);
const Accent = ({ children }: { children: ReactNode }) => (
  <span className="text-violet-brand">{children}</span>
);

export function TreeCommandPreview() {
  return (
    <div className="flex flex-col gap-1 leading-relaxed">
      <p>
        <Dir>Tree-Command-Implementation/</Dir>
      </p>
      <p>
        <Faint>&#9500;&#9472;&#9472; </Faint>
        <span className="text-ink-muted">createTree.c</span>
      </p>
      <p>
        <Faint>&#9500;&#9472;&#9472; </Faint>
        <span className="text-ink-muted">printTree.c</span>
      </p>
      <p>
        <Faint>&#9500;&#9472;&#9472; </Faint>
        <span className="text-ink-muted">sortTree.c</span>
      </p>
      <p>
        <Faint>&#9500;&#9472;&#9472; </Faint>
        <span className="text-ink-muted">json_html_xml.c</span>
      </p>
      <p>
        <Faint>&#9492;&#9472;&#9472; </Faint>
        <span className="text-ink-muted">Makefile</span>
      </p>
    </div>
  );
}

export function HttpServerPreview() {
  return (
    <div className="flex flex-col gap-1.5 leading-relaxed">
      <p>
        <Accent>&gt;</Accent> <span className="text-ink">POST /orders HTTP/1.1</span>
      </p>
      <p>
        <Accent>&gt;</Accent> <span className="text-ink-muted">Host: localhost:8080</span>
      </p>
      <p>
        <Accent>&gt;</Accent> <span className="text-ink-muted">Content-Type: application/json</span>
      </p>
      <p>
        <Accent>&gt;</Accent>
      </p>
      <p>
        <span className="text-cyan-brand">&lt;</span>{' '}
        <span className="text-ink">HTTP/1.1 201 Created</span>
      </p>
      <p>
        <span className="text-cyan-brand">&lt;</span>{' '}
        <span className="text-ink-muted">Content-Length: 42</span>
      </p>
    </div>
  );
}

export function MetaphorDetectionPreview() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-ink">The water was as pure as crystal.</p>
      <span className="my-0.5 h-px w-full bg-line" aria-hidden="true" />
      <p className="flex flex-wrap items-center gap-2">
        <Dir>(water)</Dir>
        <Faint>&#9472;[</Faint>
        <Accent>pure</Accent>
        <Faint>]&#9472;&rarr;</Faint>
        <Dir>(crystal)</Dir>
      </p>
      <p className="text-ink-muted">
        bilstm <Faint>|</Faint> bert-base-uncased
      </p>
      <p>
        <Faint>metaphor: </Faint>
        <Accent>1</Accent>
      </p>
    </div>
  );
}

export function RationSystemPreview() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-ink-faint">card classification</p>
      <p className="text-ink-muted">
        below 15,000 <Faint>&rarr;</Faint> <Accent>yellow</Accent>
      </p>
      <p className="text-ink-muted">
        15,000 &ndash; 99,999 <Faint>&rarr;</Faint> <Accent>orange</Accent>
      </p>
      <p className="text-ink-muted">
        1,00,000 and above <Faint>&rarr;</Faint> <Accent>white</Accent>
      </p>
      <span className="my-0.5 h-px w-full bg-line" aria-hidden="true" />
      <p className="text-ink-faint">wheat &middot; rice &middot; sugar</p>
    </div>
  );
}
