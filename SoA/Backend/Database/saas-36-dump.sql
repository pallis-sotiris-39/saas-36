CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE TABLE public.answer (
    id integer NOT NULL,
    user_fk integer NOT NULL,
    question_fk integer NOT NULL,
    text character varying(3000) NOT NULL,
    created timestamp without time zone NOT NULL
);

CREATE SEQUENCE public.answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.answer_id_seq OWNED BY public.answer.id;

CREATE TABLE public.question (
    id integer NOT NULL,
    user_fk integer NOT NULL,
    title character varying(255) NOT NULL,
    text character varying(3000) NOT NULL,
    created timestamp without time zone NOT NULL
);

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;

CREATE TABLE public.question_keyword (
    questionid integer NOT NULL,
    keyword character varying(50) NOT NULL
);

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

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;

ALTER TABLE ONLY public.answer ALTER COLUMN id SET DEFAULT nextval('public.answer_id_seq'::regclass);

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT answer_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.question_keyword
    ADD CONSTRAINT question_keyword_pkey PRIMARY KEY (questionid, keyword);

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_title_key UNIQUE (title);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT fkanswer312233 FOREIGN KEY (user_fk) REFERENCES public."user"(id);

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT fkanswer480594 FOREIGN KEY (question_fk) REFERENCES public.question(id);

ALTER TABLE ONLY public.question
    ADD CONSTRAINT fkquestion251144 FOREIGN KEY (user_fk) REFERENCES public."user"(id);

ALTER TABLE ONLY public.question_keyword
    ADD CONSTRAINT fkquestion_k861823 FOREIGN KEY (questionid) REFERENCES public.question(id);
