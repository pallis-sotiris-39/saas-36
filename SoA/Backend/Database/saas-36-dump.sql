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

CREATE TABLE public.keyword (
    keyword character varying(255) NOT NULL 
);

CREATE TABLE public.question_keyword (
    questionid integer NOT NULL,
    keyword character varying(255) NOT NULL
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

ALTER TABLE ONLY public.keyword
    ADD CONSTRAINT keyword_key PRIMARY KEY (keyword);

ALTER TABLE ONLY public.keyword
    ADD CONSTRAINT keyword_unique UNIQUE (keyword);

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

ALTER TABLE ONLY public.question_keyword
    ADD CONSTRAINT fkquestion_k861824 FOREIGN KEY (keyword) REFERENCES public.keyword(keyword);

COPY public."user" (id, first_name, last_name, birthday, username, email, password) FROM stdin;
1	forename	surname	1999-12-12	camperas	camperas@gmail.com	$2b$10$6NDzKyA9IlF6YeliyiokQ.R2fFpMdtstePlyZhk5EtDM38HE.Y3pa
2	forename	surname	1999-12-12	Sotiris	Sotiris@sotir.is	$2b$10$JG4GU6O2XbwcRDjcPk04DOMDKrpGAQOh.2m8T7k.mZF.i5wORecb6
3	forename	surname	1999-12-12	Filipposcat	filipposcat@cat.cat	$2b$10$6GETvqRqm2v4FWAnDz95HukPIEX4nf1FNcdM11OYpjv8oybJaxDLm
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, user_fk, title, text, created) FROM stdin;
1	1	Question1256	This is the 1256 question	2021-07-02 21:00:00
2	1	What is love? Baby don't hurt me!	Love hurts!	2021-07-09 09:30:50
3	1	Oh I love to get hurt by the love!!!	Yes	2021-07-09 09:35:40
4	1	This is a new question	Hi	2021-07-10 11:12:55
6	1	Test	Test	2021-07-10 01:04:11
7	1	MORE KEYWORDS	AAAAA	2021-07-10 03:31:18
8	1	I NEED MORE KEYWORDS	MAYB	2021-07-10 03:46:21
9	3	Am I really a cat?	Am I?	2021-07-10 04:03:50
10	1	Is this a buestion?	A muestion, a vuestion and a cuestion walk into a bar...	2021-07-10 04:05:46
11	1	Should I get a new cat?	Would it be legal?	2021-07-10 04:07:42
12	2	I maed a typo?	I'm not sure!!!!!	2021-07-10 04:08:53
\.


--
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answer (id, user_fk, question_fk, text, created) FROM stdin;
1	1	2	Love hurts indeed myself!	2021-07-09 09:31:36
2	1	1	Yes	2021-07-10 11:08:13
3	1	1	MAYB	2021-07-10 03:51:42
4	3	9	Mayb	2021-07-10 04:03:55
5	1	9	YES	2021-07-10 04:04:20
6	2	2	Love encompasses a range of strong and positive emotional and mental states, from the most sublime virtue or good habit, the deepest interpersonal affection, to the simplest pleasure. An example of this range of meanings is that the love of a mother differs from the love of a spouse, which differs from the love of food. Most commonly, love refers to a feeling of strong attraction and emotional attachment.	2021-07-10 04:09:34
7	2	10	Step 1\nPreheat oven to 140°C. Position a rack on the second lowest shelf of the oven.\nStep 2\nPlace the self-raising flour, plain flour, sugar, eggs, butter, milk and vanilla essence in a large mixing bowl. Use an electric beater to beat on low speed for 30 seconds or until just combined. Increase the speed to high and beat for 1-2 minutes or until the mixture is thick and all the butter is incorporated.\nStep 3\nBrush a round 25cm (base measurement) cake pan with the melted butter to lightly grease (see Notes tab for instructions for other tin sizes). Line base and sides with non-stick baking paper. Spoon the mixture into the prepared pan and smooth the surface with the back of a spoon.\nStep 4\nBake in preheated oven for 2 1/2 hours or until a skewer inserted into the centre of the cake comes out clean. Remove from oven and set aside for 10 minutes. Turn onto a wire rack for 2 hours or until completely cool.	2021-07-10 04:11:32
8	2	11	Barely!	2021-07-10 04:12:06
\.


--
-- Data for Name: keyword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keyword (keyword) FROM stdin;
lalala
lololo
Love
Baby
Hurt
Cats
Stuff
Pain
Gain
Mayb
Yaaas
Sotiris
Diakopares
VesCookies
Cat
Matrix
Who
Knows
Bar
Mvc
Saas

Legal
Underaged
Typo
Grammar
Javascript
WhyDoIExist
\.


--
-- Data for Name: question_keyword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_keyword (questionid, keyword) FROM stdin;
1	lalala
1	lololo
2	Love
2	Baby
2	Hurt
3	Love
3	Baby
4	Baby
6	Baby
7	Cats
7	Stuff
7	Pain
7	Gain
8	Mayb
8	Yaaas
8	Sotiris
8	Diakopares
8	VesCookies
9	Cat
9	Matrix
9	Mayb
9	Who
9	Knows
10	Bar
10	Mvc
10	Saas
10	
11	Legal
11	Cat
11	Underaged
12	Typo
12	Grammar
12	Javascript
12	WhyDoIExist
\.


--
-- Name: answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answer_id_seq', 8, true);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 12, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);