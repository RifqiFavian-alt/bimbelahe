--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id text NOT NULL,
    "studentId" text,
    month integer NOT NULL,
    year integer NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    "paidAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: questionnaires; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questionnaires (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    question1 text NOT NULL,
    question2 text NOT NULL,
    question3 text NOT NULL,
    question4 text NOT NULL,
    review text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.questionnaires OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'ADMIN'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6e365256-f821-4913-8cff-e2c33b180d27	ed408e98c0df2a309d4c971b05bb4da2f6d07b1a9f1a59687f9652abec926f6d	2025-02-04 08:53:53.842741+07	20250204015353_init	\N	\N	2025-02-04 08:53:53.804519+07	1
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, "studentId", month, year, "isPaid", "paidAt", "createdAt", "updatedAt") FROM stdin;
cm6ypktyf00030kzsi9s7sp89	cm6ypktyc00000kzsztkk7655	3	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00040kzsspcddjzf	cm6ypktyc00000kzsztkk7655	4	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00050kzsne9v74fo	cm6ypktyc00000kzsztkk7655	5	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00060kzsbz63jg39	cm6ypktyc00000kzsztkk7655	6	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00070kzsyv8ev0sg	cm6ypktyc00000kzsztkk7655	7	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00080kzsd0ruvk4b	cm6ypktyc00000kzsztkk7655	8	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00090kzsoqfoh88s	cm6ypktyc00000kzsztkk7655	9	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf000a0kzsnv8y6zwg	cm6ypktyc00000kzsztkk7655	10	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf000b0kzsavc1dyki	cm6ypktyc00000kzsztkk7655	11	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf000c0kzsl7kthmzt	cm6ypktyc00000kzsztkk7655	12	2025	f	\N	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
cm6ypktyf00010kzsaoyw9cg5	cm6ypktyc00000kzsztkk7655	1	2025	f	\N	2025-02-10 07:05:16.406	2025-04-05 10:54:34.27
cm6ypktyf00020kzsov6tzzx9	cm6ypktyc00000kzsztkk7655	2	2025	f	\N	2025-02-10 07:05:16.406	2025-03-02 05:51:20.451
\.


--
-- Data for Name: questionnaires; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questionnaires (id, name, email, question1, question2, question3, question4, review, "isFeatured", "createdAt") FROM stdin;
e18566b1-deef-4e1a-8edc-2f734cafa221	Rifqi Favian Hibatullah	rifqifavianhhibatullah@gmail.com	A	B	A	C	Pelayanan dan pengajar yang berkualitas, sangat direkomendasikan	f	2025-04-01 03:49:33.272
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, name, email, phone, "createdAt", "updatedAt") FROM stdin;
cm6ypktyc00000kzsztkk7655	Rifqi Favian H	rifqi.favian@example.com	085174307253	2025-02-10 07:05:16.406	2025-02-10 07:05:16.406
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
cm6pu4k4400000kw8isv0t68u	Super Admin	rifqifavianhibatullah@gmail.com	$2a$10$OeQRBbyE7Onx6AjLlVE.quRczSjyGKQKy306h7Ii1sbxiF2gFOnuO	ADMIN	2025-02-04 02:02:39.7	2025-03-07 10:02:31.443
cm88m48v6000b0kbwlmbgdyxm	Trial-Account	trial-account@gmail.com	$2a$10$oSPTEd8ktB3sdV6HJK1RluyVexTM4qryRGOMMfVI.Sv6duVIdnTQW	USER	2025-03-14 10:05:47.874	2025-03-14 10:05:47.874
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: questionnaires questionnaires_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaires
    ADD CONSTRAINT questionnaires_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: payments_studentId_month_year_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "payments_studentId_month_year_key" ON public.payments USING btree ("studentId", month, year);


--
-- Name: students_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX students_email_key ON public.students USING btree (email);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: payments payments_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

