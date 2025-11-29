--
-- neondb_ownerQL database dump
--

\restrict 0RU8kwBm4SscPvaPWK5WwZkZgGQF6rlF6E8wVUG4bgnRxgslh7tEk2GgAEbcnjN

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-11-26 10:41:57

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16904)
-- Name: cita; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cita (
    id_cita integer NOT NULL,
    id_servicio integer,
    id_cliente integer,
    id_empleado integer,
    fecha_servicio timestamp without time zone,
    estado character varying(50)
);


ALTER TABLE public.cita OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 16908)
-- Name: cita_id_cita_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.cita_id_cita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cita_id_cita_seq OWNER TO neondb_owner;

--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 220
-- Name: cita_id_cita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.cita_id_cita_seq OWNED BY public.cita.id_cita;


--
-- TOC entry 237 (class 1259 OID 17026)
-- Name: cliente_cupon; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cliente_cupon (
    id_usuario integer NOT NULL,
    id_cupon integer NOT NULL,
    fecha_asignacion timestamp without time zone DEFAULT now(),
    usado boolean DEFAULT false
);


ALTER TABLE public.cliente_cupon OWNER TO neondb_owner;

--
-- TOC entry 221 (class 1259 OID 16909)
-- Name: cupon; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cupon (
    id_cupon integer NOT NULL,
    porcentaje double precision,
    descripcion character varying(100)
);


ALTER TABLE public.cupon OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 16913)
-- Name: cupon_id_cupon_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.cupon_id_cupon_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cupon_id_cupon_seq OWNER TO neondb_owner;

--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 222
-- Name: cupon_id_cupon_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.cupon_id_cupon_seq OWNED BY public.cupon.id_cupon;


--
-- TOC entry 223 (class 1259 OID 16914)
-- Name: departamento; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    id_empleado integer,
    nombre character varying(50),
    telefono_departamento integer
);


ALTER TABLE public.departamento OWNER TO neondb_owner;

--
-- TOC entry 224 (class 1259 OID 16918)
-- Name: departamento_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamento_id_departamento_seq OWNER TO neondb_owner;

--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 224
-- Name: departamento_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;


--
-- TOC entry 225 (class 1259 OID 16919)
-- Name: factura; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    id_cita integer,
    fecha timestamp without time zone,
    pago_total double precision
);


ALTER TABLE public.factura OWNER TO neondb_owner;

--
-- TOC entry 226 (class 1259 OID 16923)
-- Name: factura_id_factura_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.factura_id_factura_seq OWNER TO neondb_owner;

--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 226
-- Name: factura_id_factura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;


--
-- TOC entry 227 (class 1259 OID 16924)
-- Name: metodo_pago; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.metodo_pago (
    id_metodo_pago integer NOT NULL,
    tipo_pago character varying(50)
);


ALTER TABLE public.metodo_pago OWNER TO neondb_owner;

--
-- TOC entry 228 (class 1259 OID 16928)
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.metodo_pago_id_metodo_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metodo_pago_id_metodo_pago_seq OWNER TO neondb_owner;

--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 228
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.metodo_pago_id_metodo_pago_seq OWNED BY public.metodo_pago.id_metodo_pago;


--
-- TOC entry 229 (class 1259 OID 16929)
-- Name: pago; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    id_factura integer,
    id_metodo_pago integer,
    id_cupon integer,
    monto_total double precision
);


ALTER TABLE public.pago OWNER TO neondb_owner;

--
-- TOC entry 230 (class 1259 OID 16933)
-- Name: pago_id_pago_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pago_id_pago_seq OWNER TO neondb_owner;

--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 230
-- Name: pago_id_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;


--
-- TOC entry 231 (class 1259 OID 16934)
-- Name: servicios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.servicios (
    id_servicio integer NOT NULL,
    id_departamento integer,
    nombre character varying(50),
    precio double precision
);


ALTER TABLE public.servicios OWNER TO neondb_owner;

--
-- TOC entry 232 (class 1259 OID 16938)
-- Name: servicios_id_servicio_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.servicios_id_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_id_servicio_seq OWNER TO neondb_owner;

--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 232
-- Name: servicios_id_servicio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.servicios_id_servicio_seq OWNED BY public.servicios.id_servicio;


--
-- TOC entry 233 (class 1259 OID 16939)
-- Name: tipos_usuario; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tipos_usuario (
    id_tipo_usuario integer NOT NULL,
    de_tipo_usuario character varying(50)
);


ALTER TABLE public.tipos_usuario OWNER TO neondb_owner;

--
-- TOC entry 234 (class 1259 OID 16943)
-- Name: tipos_usuario_id_tipo_usuario_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.tipos_usuario_id_tipo_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_usuario_id_tipo_usuario_seq OWNER TO neondb_owner;

--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipos_usuario_id_tipo_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.tipos_usuario_id_tipo_usuario_seq OWNED BY public.tipos_usuario.id_tipo_usuario;


--
-- TOC entry 235 (class 1259 OID 16944)
-- Name: usuario; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(26),
    password character varying(16),
    email character varying(100),
    id_tipo_usuario integer
);


ALTER TABLE public.usuario OWNER TO neondb_owner;

--
-- TOC entry 236 (class 1259 OID 16948)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO neondb_owner;

--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 236
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 4900 (class 2604 OID 16949)
-- Name: cita id_cita; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cita ALTER COLUMN id_cita SET DEFAULT nextval('public.cita_id_cita_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 16950)
-- Name: cupon id_cupon; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cupon ALTER COLUMN id_cupon SET DEFAULT nextval('public.cupon_id_cupon_seq'::regclass);


--
-- TOC entry 4902 (class 2604 OID 16951)
-- Name: departamento id_departamento; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);


--
-- TOC entry 4903 (class 2604 OID 16952)
-- Name: factura id_factura; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);


--
-- TOC entry 4904 (class 2604 OID 16953)
-- Name: metodo_pago id_metodo_pago; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.metodo_pago ALTER COLUMN id_metodo_pago SET DEFAULT nextval('public.metodo_pago_id_metodo_pago_seq'::regclass);


--
-- TOC entry 4905 (class 2604 OID 16954)
-- Name: pago id_pago; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);


--
-- TOC entry 4906 (class 2604 OID 16955)
-- Name: servicios id_servicio; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.servicios ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicios_id_servicio_seq'::regclass);


--
-- TOC entry 4907 (class 2604 OID 16956)
-- Name: tipos_usuario id_tipo_usuario; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_usuario ALTER COLUMN id_tipo_usuario SET DEFAULT nextval('public.tipos_usuario_id_tipo_usuario_seq'::regclass);


--
-- TOC entry 4908 (class 2604 OID 16957)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 5090 (class 0 OID 16904)
-- Dependencies: 219
-- Data for Name: cita; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cita (id_cita, id_servicio, id_cliente, id_empleado, fecha_servicio, estado) FROM stdin;
1	1	1	3	2025-11-15 10:00:00	Completada
2	2	2	4	2025-11-20 14:30:00	Cancelada
3	3	1	5	2025-11-22 09:00:00	Reservada
\.


--
-- TOC entry 5108 (class 0 OID 17026)
-- Dependencies: 237
-- Data for Name: cliente_cupon; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cliente_cupon (id_usuario, id_cupon, fecha_asignacion, usado) FROM stdin;
1	1	2025-11-24 00:39:46.704358	f
1	2	2025-11-24 00:39:46.704358	f
2	2	2025-11-24 00:39:46.704358	f
2	3	2025-11-24 00:39:46.704358	f
3	1	2025-11-24 00:39:46.704358	f
\.


--
-- TOC entry 5092 (class 0 OID 16909)
-- Dependencies: 221
-- Data for Name: cupon; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cupon (id_cupon, porcentaje, descripcion) FROM stdin;
1	10	Descuento bienvenida
2	20	Promoción verano
3	15	Cliente frecuente
4	10	Descuento bienvenida
5	15	Cliente fiel
6	20	Promoción especial noviembre
\.


--
-- TOC entry 5094 (class 0 OID 16914)
-- Dependencies: 223
-- Data for Name: departamento; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.departamento (id_departamento, id_empleado, nombre, telefono_departamento) FROM stdin;
1	3	Masajes	912345001
2	4	Estética	912345002
3	5	Manicura	912345003
\.


--
-- TOC entry 5096 (class 0 OID 16919)
-- Dependencies: 225
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.factura (id_factura, id_cita, fecha, pago_total) FROM stdin;
1	1	2025-11-15 11:00:00	45
2	2	2025-11-20 15:00:00	40
3	3	2025-11-22 10:00:00	20
\.


--
-- TOC entry 5098 (class 0 OID 16924)
-- Dependencies: 227
-- Data for Name: metodo_pago; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.metodo_pago (id_metodo_pago, tipo_pago) FROM stdin;
1	Efectivo
2	Tarjeta
3	Transferencia
\.


--
-- TOC entry 5100 (class 0 OID 16929)
-- Dependencies: 229
-- Data for Name: pago; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.pago (id_pago, id_factura, id_metodo_pago, id_cupon, monto_total) FROM stdin;
1	1	2	1	45
2	2	1	2	40
3	3	3	3	20
\.


--
-- TOC entry 5102 (class 0 OID 16934)
-- Dependencies: 231
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.servicios (id_servicio, id_departamento, nombre, precio) FROM stdin;
1	1	Masaje relajante	50
2	2	Facial hidratante	40
3	3	Manicura básica	20
\.


--
-- TOC entry 5104 (class 0 OID 16939)
-- Dependencies: 233
-- Data for Name: tipos_usuario; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.tipos_usuario (id_tipo_usuario, de_tipo_usuario) FROM stdin;
1	Administrador
2	Cliente
3	Empleado
\.


--
-- TOC entry 5106 (class 0 OID 16944)
-- Dependencies: 235
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.usuario (id_usuario, nombre, password, email, id_tipo_usuario) FROM stdin;
1	María López	clave123	maria@example.com	2
2	Geanfranco	Mango123.	Hola@gmail.com	2
3	José Pérez	emp123	jose.perez@spa.com	3
4	Ana Ruiz	emp456	ana.ruiz@spa.com	3
5	Luis Gómez	emp789	luis.gomez@spa.com	3
\.


--
-- TOC entry 5123 (class 0 OID 0)
-- Dependencies: 220
-- Name: cita_id_cita_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.cita_id_cita_seq', 3, true);


--
-- TOC entry 5124 (class 0 OID 0)
-- Dependencies: 222
-- Name: cupon_id_cupon_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.cupon_id_cupon_seq', 6, true);


--
-- TOC entry 5125 (class 0 OID 0)
-- Dependencies: 224
-- Name: departamento_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 3, true);


--
-- TOC entry 5126 (class 0 OID 0)
-- Dependencies: 226
-- Name: factura_id_factura_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.factura_id_factura_seq', 3, true);


--
-- TOC entry 5127 (class 0 OID 0)
-- Dependencies: 228
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.metodo_pago_id_metodo_pago_seq', 3, true);


--
-- TOC entry 5128 (class 0 OID 0)
-- Dependencies: 230
-- Name: pago_id_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.pago_id_pago_seq', 3, true);


--
-- TOC entry 5129 (class 0 OID 0)
-- Dependencies: 232
-- Name: servicios_id_servicio_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.servicios_id_servicio_seq', 3, true);


--
-- TOC entry 5130 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipos_usuario_id_tipo_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.tipos_usuario_id_tipo_usuario_seq', 3, true);


--
-- TOC entry 5131 (class 0 OID 0)
-- Dependencies: 236
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 5, true);


--
-- TOC entry 4912 (class 2606 OID 16959)
-- Name: cita cita_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (id_cita);


--
-- TOC entry 4930 (class 2606 OID 17034)
-- Name: cliente_cupon cliente_cupon_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cliente_cupon
    ADD CONSTRAINT cliente_cupon_pkey PRIMARY KEY (id_usuario, id_cupon);


--
-- TOC entry 4914 (class 2606 OID 16961)
-- Name: cupon cupon_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cupon
    ADD CONSTRAINT cupon_pkey PRIMARY KEY (id_cupon);


--
-- TOC entry 4916 (class 2606 OID 16963)
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);


--
-- TOC entry 4918 (class 2606 OID 16965)
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);


--
-- TOC entry 4920 (class 2606 OID 16967)
-- Name: metodo_pago metodo_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.metodo_pago
    ADD CONSTRAINT metodo_pago_pkey PRIMARY KEY (id_metodo_pago);


--
-- TOC entry 4922 (class 2606 OID 16969)
-- Name: pago pago_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);


--
-- TOC entry 4924 (class 2606 OID 16971)
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id_servicio);


--
-- TOC entry 4926 (class 2606 OID 16973)
-- Name: tipos_usuario tipos_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_usuario
    ADD CONSTRAINT tipos_usuario_pkey PRIMARY KEY (id_tipo_usuario);


--
-- TOC entry 4928 (class 2606 OID 16975)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4931 (class 2606 OID 16976)
-- Name: cita cita_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4932 (class 2606 OID 16981)
-- Name: cita cita_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4933 (class 2606 OID 16986)
-- Name: cita cita_id_servicio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public.servicios(id_servicio);


--
-- TOC entry 4934 (class 2606 OID 16991)
-- Name: departamento departamento_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4935 (class 2606 OID 16996)
-- Name: factura factura_id_cita_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_cita_fkey FOREIGN KEY (id_cita) REFERENCES public.cita(id_cita);


--
-- TOC entry 4941 (class 2606 OID 17040)
-- Name: cliente_cupon fk_cc_cupon; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cliente_cupon
    ADD CONSTRAINT fk_cc_cupon FOREIGN KEY (id_cupon) REFERENCES public.cupon(id_cupon) ON DELETE CASCADE;


--
-- TOC entry 4942 (class 2606 OID 17035)
-- Name: cliente_cupon fk_cc_usuario; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cliente_cupon
    ADD CONSTRAINT fk_cc_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4936 (class 2606 OID 17001)
-- Name: pago pago_id_cupon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_cupon_fkey FOREIGN KEY (id_cupon) REFERENCES public.cupon(id_cupon);


--
-- TOC entry 4937 (class 2606 OID 17006)
-- Name: pago pago_id_factura_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);


--
-- TOC entry 4938 (class 2606 OID 17011)
-- Name: pago pago_id_metodo_pago_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_metodo_pago_fkey FOREIGN KEY (id_metodo_pago) REFERENCES public.metodo_pago(id_metodo_pago);


--
-- TOC entry 4939 (class 2606 OID 17016)
-- Name: servicios servicios_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento);


--
-- TOC entry 4940 (class 2606 OID 17021)
-- Name: usuario usuario_id_tipo_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_tipo_usuario_fkey FOREIGN KEY (id_tipo_usuario) REFERENCES public.tipos_usuario(id_tipo_usuario);


-- Completed on 2025-11-26 10:41:58

--
-- neondb_ownerQL database dump complete
--

\unrestrict 0RU8kwBm4SscPvaPWK5WwZkZgGQF6rlF6E8wVUG4bgnRxgslh7tEk2GgAEbcnjN

