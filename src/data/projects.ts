import type { Project } from '@/types';

/**
 * Every field below is taken from the linked repository's README and file
 * layout — nothing is inferred beyond what the code and docs state.
 */
export const projects: Project[] = [
  {
    id: 'tree-command',
    title: 'Tree Command Implementation',
    kind: 'personal',
    context: 'Systems project · C',
    description:
      'A reimplementation of the Linux tree utility in C: recursive, depth-indented directory listings with filtering, sorting, file metadata and export to structured formats.',
    features: [
      'Recursive traversal into an in-memory tree holding name, type, size, permissions, owner, inode and modification time',
      'Wildcard include and exclude patterns, plus depth limiting and directories-only listing',
      'Merge sort for alphabetical, reverse and modification-time ordering',
      'Export to JSON, XML and HTML alongside coloured terminal output',
      'Modular C split across traversal, printing, sorting and pattern-matching units, built with a Makefile',
    ],
    challenges: [
      'One traversal has to feed four renderers — terminal, JSON, XML and HTML — without duplicating the walk for each.',
      'Flags combine rather than act alone, so argument parsing had to handle interactions between listing, file and sorting options.',
    ],
    technologies: [
      'C',
      'POSIX system calls',
      'Data structures',
      'Recursion',
      'Merge sort',
      'Makefile',
    ],
    repoUrl: 'https://github.com/sanmeet26/Tree-Command-Implementation',
    liveUrl: null,
    featured: true,
  },
  {
    id: 'http-server',
    title: 'HTTP Server from scratch',
    kind: 'personal',
    context: 'Networking project · Python',
    description:
      'A lightweight HTTP server built directly on TCP sockets — request parsing, static file serving, cookies, logging and concurrent clients, with no web framework underneath.',
    features: [
      'GET, HEAD, POST, PUT and DELETE, with its own request parsing and status-code-correct responses',
      'Static file serving from a configurable document root, plus POST data and file upload handling',
      'Cookie management and separate access and error logs',
      'Multithreaded client handling, with a control script for start, stop and restart',
      'Confirmation and load test suites driven by a companion testing client',
    ],
    challenges: [
      'Response framing — headers, content length, connection handling — is where a naive socket server quietly breaks.',
      'Port, connection limits, document root and log paths all had to move into a config file rather than living in the code.',
    ],
    technologies: ['Python', 'TCP sockets', 'HTTP', 'Multithreading', 'Computer Networks'],
    repoUrl: 'https://github.com/sanmeet26/http-server',
    liveUrl: null,
    featured: true,
  },
  {
    id: 'metaphor-detection',
    title: 'Conceptual Metaphor Detection Using Dependency Parsing',
    kind: 'personal',
    context: 'B.Tech project · NLP',
    description:
      'An NLP pipeline that decides whether an English sentence is metaphorical, by reducing it to a concept–attribute relationship through dependency parsing and classifying that relationship with deep learning models.',
    features: [
      'POS tagging and dependency parsing via Stanford CoreNLP to extract concept–attribute pairs',
      'Knowledge graph of target–attribute–source triples, stored and queried in Neo4j',
      'BiLSTM classifier over triple embeddings, and a second classifier over BERT contextual embeddings',
      'A labelled corpus of 1,815 sentences, tagged metaphorical or literal',
      'Prediction notebook that runs the trained model against new sentences',
    ],
    challenges: [
      'A metaphor is not a keyword, so a sentence has to be reduced to a target–attribute–source relationship before any model can judge it.',
      'Stanford CoreNLP and the POS tagger are Java tools, so the pipeline spans two runtimes and needs its paths wired up per machine.',
    ],
    technologies: [
      'Python',
      'NLTK',
      'Stanford CoreNLP',
      'TensorFlow / Keras',
      'PyTorch',
      'Transformers',
      'Neo4j',
      'NetworkX',
    ],
    repoUrl: 'https://github.com/sanmeet26/Conceptual-Metaphor-Detection-Using-Dependency-Parser',
    liveUrl: null,
    featured: true,
  },
  {
    id: 'ration-management-system',
    title: 'Ration Management System',
    kind: 'personal',
    context: 'Web application · PHP',
    description:
      'A Public Distribution System application that dispenses the correct ration quantity for each card holder based on card type and family size, and keeps every transaction in the database.',
    features: [
      'Role-based access for admin, field officer, distributor and customer, with session authentication',
      'User and ration-card registration, with card category assigned automatically from declared income',
      'Monthly purchase registration and wheat, rice and sugar quantity tracking',
      'Price calculation by card category, plus purchase history lookup per holder',
    ],
    challenges: [
      'Entitlement depends on both card category and family size, so quantities and prices had to be derived per holder rather than fixed.',
      'Four roles read and write the same records from four different angles, which put the authorisation checks at the centre of the design.',
    ],
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'Apache / XAMPP'],
    repoUrl: 'https://github.com/sanmeet26/Ration-Management-System',
    liveUrl: null,
    featured: true,
  },
];
