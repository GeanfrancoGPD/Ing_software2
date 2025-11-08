--
-- PostgreSQL database dump
--

\restrict 8AoCjySYJunWp8gflbfzZbnS0iRvg3RQqbaVZTHVeLp9U6UqMI0eDDGCJviIo9k

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-08 12:29:21

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
-- TOC entry 226 (class 1259 OID 64121)
-- Name: cita; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cita (
    id_cita integer NOT NULL,
    id_servicio integer,
    id_cliente integer,
    id_empleado integer,
    fecha_servicio timestamp without time zone,
    estado character varying(50)
);


ALTER TABLE public.cita OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 64120)
-- Name: cita_id_cita_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cita_id_cita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cita_id_cita_seq OWNER TO postgres;

--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 225
-- Name: cita_id_cita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cita_id_cita_seq OWNED BY public.cita.id_cita;


--
-- TOC entry 232 (class 1259 OID 64162)
-- Name: cupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cupon (
    id_cupon integer NOT NULL,
    porcentaje double precision,
    descripcion character varying(100)
);


ALTER TABLE public.cupon OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 64161)
-- Name: cupon_id_cupon_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cupon_id_cupon_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cupon_id_cupon_seq OWNER TO postgres;

--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 231
-- Name: cupon_id_cupon_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cupon_id_cupon_seq OWNED BY public.cupon.id_cupon;


--
-- TOC entry 222 (class 1259 OID 64097)
-- Name: departamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    id_empleado integer,
    nombre character varying(50),
    telefono_departamento integer
);


ALTER TABLE public.departamento OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 64096)
-- Name: departamento_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamento_id_departamento_seq OWNER TO postgres;

--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 221
-- Name: departamento_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;


--
-- TOC entry 228 (class 1259 OID 64143)
-- Name: factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    id_cita integer,
    fecha timestamp without time zone,
    pago_total double precision
);


ALTER TABLE public.factura OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 64142)
-- Name: factura_id_factura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.factura_id_factura_seq OWNER TO postgres;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 227
-- Name: factura_id_factura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;


--
-- TOC entry 230 (class 1259 OID 64155)
-- Name: metodo_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metodo_pago (
    id_metodo_pago integer NOT NULL,
    tipo_pago character varying(50)
);


ALTER TABLE public.metodo_pago OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 64154)
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metodo_pago_id_metodo_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metodo_pago_id_metodo_pago_seq OWNER TO postgres;

--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 229
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metodo_pago_id_metodo_pago_seq OWNED BY public.metodo_pago.id_metodo_pago;


--
-- TOC entry 234 (class 1259 OID 64169)
-- Name: pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    id_factura integer,
    id_metodo_pago integer,
    id_cupon integer,
    monto_total double precision
);


ALTER TABLE public.pago OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 64168)
-- Name: pago_id_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pago_id_pago_seq OWNER TO postgres;

--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 233
-- Name: pago_id_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;


--
-- TOC entry 224 (class 1259 OID 64109)
-- Name: servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicios (
    id_servicio integer NOT NULL,
    id_departamento integer,
    nombre character varying(50),
    precio double precision
);


ALTER TABLE public.servicios OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 64108)
-- Name: servicios_id_servicio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicios_id_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_id_servicio_seq OWNER TO postgres;

--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 223
-- Name: servicios_id_servicio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicios_id_servicio_seq OWNED BY public.servicios.id_servicio;


--
-- TOC entry 218 (class 1259 OID 64078)
-- Name: tipos_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_usuario (
    id_tipo_usuario integer NOT NULL,
    de_tipo_usuario character varying(50)
);


ALTER TABLE public.tipos_usuario OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 64077)
-- Name: tipos_usuario_id_tipo_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_usuario_id_tipo_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_usuario_id_tipo_usuario_seq OWNER TO postgres;

--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 217
-- Name: tipos_usuario_id_tipo_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_usuario_id_tipo_usuario_seq OWNED BY public.tipos_usuario.id_tipo_usuario;


--
-- TOC entry 220 (class 1259 OID 64085)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(26),
    password character varying(16),
    email character varying(100),
    id_tipo_usuario integer
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 64084)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 4739 (class 2604 OID 64124)
-- Name: cita id_cita; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita ALTER COLUMN id_cita SET DEFAULT nextval('public.cita_id_cita_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 64165)
-- Name: cupon id_cupon; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupon ALTER COLUMN id_cupon SET DEFAULT nextval('public.cupon_id_cupon_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 64100)
-- Name: departamento id_departamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 64146)
-- Name: factura id_factura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 64158)
-- Name: metodo_pago id_metodo_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodo_pago ALTER COLUMN id_metodo_pago SET DEFAULT nextval('public.metodo_pago_id_metodo_pago_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 64172)
-- Name: pago id_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);


--
-- TOC entry 4738 (class 2604 OID 64112)
-- Name: servicios id_servicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicios_id_servicio_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 64081)
-- Name: tipos_usuario id_tipo_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_usuario ALTER COLUMN id_tipo_usuario SET DEFAULT nextval('public.tipos_usuario_id_tipo_usuario_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 64088)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 4926 (class 0 OID 64121)
-- Dependencies: 226
-- Data for Name: cita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cita (id_cita, id_servicio, id_cliente, id_empleado, fecha_servicio, estado) FROM stdin;
\.


--
-- TOC entry 4932 (class 0 OID 64162)
-- Dependencies: 232
-- Data for Name: cupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cupon (id_cupon, porcentaje, descripcion) FROM stdin;
\.


--
-- TOC entry 4922 (class 0 OID 64097)
-- Dependencies: 222
-- Data for Name: departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamento (id_departamento, id_empleado, nombre, telefono_departamento) FROM stdin;
\.


--
-- TOC entry 4928 (class 0 OID 64143)
-- Dependencies: 228
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.factura (id_factura, id_cita, fecha, pago_total) FROM stdin;
\.


--
-- TOC entry 4930 (class 0 OID 64155)
-- Dependencies: 230
-- Data for Name: metodo_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metodo_pago (id_metodo_pago, tipo_pago) FROM stdin;
\.


--
-- TOC entry 4934 (class 0 OID 64169)
-- Dependencies: 234
-- Data for Name: pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pago (id_pago, id_factura, id_metodo_pago, id_cupon, monto_total) FROM stdin;
\.


--
-- TOC entry 4924 (class 0 OID 64109)
-- Dependencies: 224
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicios (id_servicio, id_departamento, nombre, precio) FROM stdin;
\.


--
-- TOC entry 4918 (class 0 OID 64078)
-- Dependencies: 218
-- Data for Name: tipos_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_usuario (id_tipo_usuario, de_tipo_usuario) FROM stdin;
1	Administrador
2	Cliente
3	Empleado
\.


--
-- TOC entry 4920 (class 0 OID 64085)
-- Dependencies: 220
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, nombre, password, email, id_tipo_usuario) FROM stdin;
1	María López	clave123	maria@example.com	2
\.


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 225
-- Name: cita_id_cita_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cita_id_cita_seq', 1, false);


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 231
-- Name: cupon_id_cupon_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cupon_id_cupon_seq', 1, false);


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 221
-- Name: departamento_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 1, false);


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 227
-- Name: factura_id_factura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_id_factura_seq', 1, false);


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 229
-- Name: metodo_pago_id_metodo_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metodo_pago_id_metodo_pago_seq', 1, false);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 233
-- Name: pago_id_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pago_id_pago_seq', 1, false);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 223
-- Name: servicios_id_servicio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicios_id_servicio_seq', 1, false);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 217
-- Name: tipos_usuario_id_tipo_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_usuario_id_tipo_usuario_seq', 3, true);


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 1, true);


--
-- TOC entry 4753 (class 2606 OID 64126)
-- Name: cita cita_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (id_cita);


--
-- TOC entry 4759 (class 2606 OID 64167)
-- Name: cupon cupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupon
    ADD CONSTRAINT cupon_pkey PRIMARY KEY (id_cupon);


--
-- TOC entry 4749 (class 2606 OID 64102)
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);


--
-- TOC entry 4755 (class 2606 OID 64148)
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);


--
-- TOC entry 4757 (class 2606 OID 64160)
-- Name: metodo_pago metodo_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodo_pago
    ADD CONSTRAINT metodo_pago_pkey PRIMARY KEY (id_metodo_pago);


--
-- TOC entry 4761 (class 2606 OID 64174)
-- Name: pago pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);


--
-- TOC entry 4751 (class 2606 OID 64114)
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id_servicio);


--
-- TOC entry 4745 (class 2606 OID 64083)
-- Name: tipos_usuario tipos_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_usuario
    ADD CONSTRAINT tipos_usuario_pkey PRIMARY KEY (id_tipo_usuario);


--
-- TOC entry 4747 (class 2606 OID 64090)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4765 (class 2606 OID 64132)
-- Name: cita cita_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4766 (class 2606 OID 64137)
-- Name: cita cita_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4767 (class 2606 OID 64127)
-- Name: cita cita_id_servicio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public.servicios(id_servicio);


--
-- TOC entry 4763 (class 2606 OID 64103)
-- Name: departamento departamento_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4768 (class 2606 OID 64149)
-- Name: factura factura_id_cita_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_cita_fkey FOREIGN KEY (id_cita) REFERENCES public.cita(id_cita);


--
-- TOC entry 4769 (class 2606 OID 64185)
-- Name: pago pago_id_cupon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_cupon_fkey FOREIGN KEY (id_cupon) REFERENCES public.cupon(id_cupon);


--
-- TOC entry 4770 (class 2606 OID 64175)
-- Name: pago pago_id_factura_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);


--
-- TOC entry 4771 (class 2606 OID 64180)
-- Name: pago pago_id_metodo_pago_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_metodo_pago_fkey FOREIGN KEY (id_metodo_pago) REFERENCES public.metodo_pago(id_metodo_pago);


--
-- TOC entry 4764 (class 2606 OID 64115)
-- Name: servicios servicios_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento);


--
-- TOC entry 4762 (class 2606 OID 64091)
-- Name: usuario usuario_id_tipo_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_tipo_usuario_fkey FOREIGN KEY (id_tipo_usuario) REFERENCES public.tipos_usuario(id_tipo_usuario);


-- Completed on 2025-11-08 12:29:22

--
-- PostgreSQL database dump complete
--

\unrestrict 8AoCjySYJunWp8gflbfzZbnS0iRvg3RQqbaVZTHVeLp9U6UqMI0eDDGCJviIo9k

