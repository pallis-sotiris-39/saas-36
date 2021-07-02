ALTER TABLE ONLY public.question_keyword DROP CONSTRAINT fkquestion_k861823;
ALTER TABLE ONLY public.question DROP CONSTRAINT fkquestion251144;
ALTER TABLE ONLY public.answer DROP CONSTRAINT fkanswer480594;
ALTER TABLE ONLY public.answer DROP CONSTRAINT fkanswer312233;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_username_key;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
ALTER TABLE ONLY public.question DROP CONSTRAINT question_title_key;
ALTER TABLE ONLY public.question DROP CONSTRAINT question_pkey;
ALTER TABLE ONLY public.question_keyword DROP CONSTRAINT question_keyword_pkey;
ALTER TABLE ONLY public.answer DROP CONSTRAINT answer_pkey;
ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.question ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.answer ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.user_id_seq;
DROP TABLE public."user";
DROP TABLE public.question_keyword;
DROP SEQUENCE public.question_id_seq;
DROP TABLE public.question;
DROP SEQUENCE public.answer_id_seq;
DROP TABLE public.answer;
DROP EXTENSION pgcrypto;
--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: answer; Type: TABLE; Schema: public; Owner: typo
--

CREATE TABLE public.answer (
    id integer NOT NULL,
    user_fk integer NOT NULL,
    question_fk integer NOT NULL,
    text character varying(3000) NOT NULL,
    created timestamp without time zone NOT NULL
);



--
-- Name: answer_id_seq; Type: SEQUENCE; Schema: public; Owner: typo
--

CREATE SEQUENCE public.answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: typo
--

ALTER SEQUENCE public.answer_id_seq OWNED BY public.answer.id;


--
-- Name: question; Type: TABLE; Schema: public; Owner: typo
--

CREATE TABLE public.question (
    id integer NOT NULL,
    user_fk integer NOT NULL,
    title character varying(255) NOT NULL,
    text character varying(3000) NOT NULL,
    created timestamp without time zone NOT NULL
);



--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: typo
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: typo
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: question_keyword; Type: TABLE; Schema: public; Owner: typo
--

CREATE TABLE public.question_keyword (
    questionid integer NOT NULL,
    keyword character varying(50) NOT NULL
);



--
-- Name: user; Type: TABLE; Schema: public; Owner: typo
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    birthday date NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255),
    password character varying(255) NOT NULL,
    CONSTRAINT user_email_check CHECK (((email)::text ~~ '%___@___%'::text))
);



--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: typo
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: typo
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: answer id; Type: DEFAULT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.answer ALTER COLUMN id SET DEFAULT nextval('public.answer_id_seq'::regclass);


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: typo
--


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: typo
--

--
-- Name: answer answer_pkey; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT answer_pkey PRIMARY KEY (id);


--
-- Name: question_keyword question_keyword_pkey; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.question_keyword
    ADD CONSTRAINT question_keyword_pkey PRIMARY KEY (questionid, keyword);


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- Name: question question_title_key; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_title_key UNIQUE (title);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: answer fkanswer312233; Type: FK CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT fkanswer312233 FOREIGN KEY (user_fk) REFERENCES public."user"(id);


--
-- Name: answer fkanswer480594; Type: FK CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT fkanswer480594 FOREIGN KEY (question_fk) REFERENCES public.question(id);


--
-- Name: question fkquestion251144; Type: FK CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT fkquestion251144 FOREIGN KEY (user_fk) REFERENCES public."user"(id);


--
-- Name: question_keyword fkquestion_k861823; Type: FK CONSTRAINT; Schema: public; Owner: typo
--

ALTER TABLE ONLY public.question_keyword
    ADD CONSTRAINT fkquestion_k861823 FOREIGN KEY (questionid) REFERENCES public.question(id);


--
-- PostgreSQL database dump complete
--

