--
-- PostgreSQL database dump
--

\restrict muevZti0fkb0gFT3Eb69CAhuwYwcau63veD0mDO7jTu1LGyPTtHzMMNaaXVgySu

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: puntopymes
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO puntopymes;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: puntopymes
--

COMMENT ON SCHEMA public IS '';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: anuncios_prioridad_enum; Type: TYPE; Schema: public; Owner: puntopymes
--

CREATE TYPE public.anuncios_prioridad_enum AS ENUM (
    'BAJA',
    'MEDIA',
    'ALTA'
);


ALTER TYPE public.anuncios_prioridad_enum OWNER TO puntopymes;

--
-- Name: beneficios_indicador_enum; Type: TYPE; Schema: public; Owner: puntopymes
--

CREATE TYPE public.beneficios_indicador_enum AS ENUM (
    'Ingreso',
    'Descuento',
    'Informativo'
);


ALTER TYPE public.beneficios_indicador_enum OWNER TO puntopymes;

--
-- Name: beneficios_tipo_enum; Type: TYPE; Schema: public; Owner: puntopymes
--

CREATE TYPE public.beneficios_tipo_enum AS ENUM (
    'Monetario',
    'No Monetario'
);


ALTER TYPE public.beneficios_tipo_enum OWNER TO puntopymes;

--
-- Name: conceptos_nomina_tipo_enum; Type: TYPE; Schema: public; Owner: puntopymes
--

CREATE TYPE public.conceptos_nomina_tipo_enum AS ENUM (
    'Ingreso',
    'Egreso'
);


ALTER TYPE public.conceptos_nomina_tipo_enum OWNER TO puntopymes;

--
-- Name: novedades_nomina_estado_enum; Type: TYPE; Schema: public; Owner: puntopymes
--

CREATE TYPE public.novedades_nomina_estado_enum AS ENUM (
    'Pendiente',
    'Procesada',
    'Cancelada'
);


ALTER TYPE public.novedades_nomina_estado_enum OWNER TO puntopymes;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.activos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    descripcion text,
    serial character varying(255),
    tipo character varying(100) NOT NULL,
    estado character varying(50) DEFAULT 'DISPONIBLE'::character varying NOT NULL,
    valor double precision,
    "imageUrl" text,
    "fechaAdquisicion" date,
    "empresaId" uuid NOT NULL,
    "sucursalId" uuid
);


ALTER TABLE public.activos OWNER TO puntopymes;

--
-- Name: COLUMN activos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN activos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN activos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN activos.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos.nombre IS 'Nombre del activo (Laptop Dell XPS)';


--
-- Name: COLUMN activos.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos.descripcion IS 'Descripción detallada o notas';


--
-- Name: COLUMN activos.serial; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos.serial IS 'Número de serial único (si aplica)';


--
-- Name: COLUMN activos.tipo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos.tipo IS 'Categoría (Computación, Mobiliario)';


--
-- Name: COLUMN activos.valor; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos.valor IS 'Costo de compra';


--
-- Name: COLUMN activos."imageUrl"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos."imageUrl" IS 'URL de la foto del activo';


--
-- Name: activos_asignados; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.activos_asignados (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "fechaAsignacion" date DEFAULT ('now'::text)::date NOT NULL,
    "fechaDevolucion" date,
    estado character varying(50) DEFAULT 'VIGENTE'::character varying NOT NULL,
    observaciones text,
    "activoId" uuid NOT NULL,
    "empleadoId" uuid NOT NULL
);


ALTER TABLE public.activos_asignados OWNER TO puntopymes;

--
-- Name: COLUMN activos_asignados."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN activos_asignados."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN activos_asignados."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN activos_asignados."fechaAsignacion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."fechaAsignacion" IS 'Fecha de entrega del activo al empleado';


--
-- Name: COLUMN activos_asignados."fechaDevolucion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."fechaDevolucion" IS 'Fecha de devolución del activo';


--
-- Name: COLUMN activos_asignados.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados.estado IS 'Estado de la asignación (VIGENTE, DEVUELTO)';


--
-- Name: COLUMN activos_asignados.observaciones; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados.observaciones IS 'Observaciones de entrega o devolución';


--
-- Name: COLUMN activos_asignados."activoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."activoId" IS 'ID del Activo asignado';


--
-- Name: COLUMN activos_asignados."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.activos_asignados."empleadoId" IS 'ID del Empleado que recibe el activo';


--
-- Name: anuncios; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.anuncios (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying NOT NULL,
    contenido text NOT NULL,
    prioridad public.anuncios_prioridad_enum DEFAULT 'MEDIA'::public.anuncios_prioridad_enum NOT NULL,
    "fechaExpiracion" timestamp without time zone,
    "empresaId" character varying NOT NULL,
    "sucursalId" uuid
);


ALTER TABLE public.anuncios OWNER TO puntopymes;

--
-- Name: COLUMN anuncios."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.anuncios."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN anuncios."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.anuncios."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN anuncios."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.anuncios."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: asignaciones_tareas; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.asignaciones_tareas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "tareaId" uuid NOT NULL,
    "empleadoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    observaciones text,
    "fechaAsignacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.asignaciones_tareas OWNER TO puntopymes;

--
-- Name: COLUMN asignaciones_tareas."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN asignaciones_tareas."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN asignaciones_tareas."tareaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas."tareaId" IS 'ID de la Tarea asignada';


--
-- Name: COLUMN asignaciones_tareas."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas."empleadoId" IS 'ID del Empleado responsable';


--
-- Name: COLUMN asignaciones_tareas."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN asignaciones_tareas.observaciones; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas.observaciones IS 'Observaciones o instrucciones para la asignación';


--
-- Name: COLUMN asignaciones_tareas."fechaAsignacion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.asignaciones_tareas."fechaAsignacion" IS 'Fecha y hora de asignación';


--
-- Name: beneficios; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.beneficios (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    descripcion text,
    tipo public.beneficios_tipo_enum DEFAULT 'Monetario'::public.beneficios_tipo_enum NOT NULL,
    "esAutomatico" boolean DEFAULT false NOT NULL,
    "porcentajeCalculo" numeric,
    indicador public.beneficios_indicador_enum DEFAULT 'Ingreso'::public.beneficios_indicador_enum NOT NULL,
    "esRecurrente" boolean DEFAULT false NOT NULL,
    "montoEstimado" numeric(10,2),
    "empresaId" uuid NOT NULL
);


ALTER TABLE public.beneficios OWNER TO puntopymes;

--
-- Name: COLUMN beneficios."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN beneficios."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN beneficios."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN beneficios."esAutomatico"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios."esAutomatico" IS 'Si es true, se aplica a TODOS automáticamente (Ej: IESS)';


--
-- Name: COLUMN beneficios."porcentajeCalculo"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios."porcentajeCalculo" IS 'Porcentaje a calcular sobre el sueldo (Ej: 0.0945 para 9.45%)';


--
-- Name: beneficios_asignados; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.beneficios_asignados (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "fechaAsignacion" date DEFAULT ('now'::text)::date NOT NULL,
    "montoPersonalizado" numeric(10,2),
    activo boolean DEFAULT true NOT NULL,
    "empleadoId" uuid NOT NULL,
    "beneficioId" uuid NOT NULL
);


ALTER TABLE public.beneficios_asignados OWNER TO puntopymes;

--
-- Name: COLUMN beneficios_asignados."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN beneficios_asignados."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN beneficios_asignados."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN beneficios_asignados."fechaAsignacion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."fechaAsignacion" IS 'Fecha de asignación del beneficio al empleado';


--
-- Name: COLUMN beneficios_asignados."montoPersonalizado"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."montoPersonalizado" IS 'Valor específico para este empleado (sobrescribe al general)';


--
-- Name: COLUMN beneficios_asignados.activo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados.activo IS 'Si es false, el motor de nómina ignora esta asignación';


--
-- Name: COLUMN beneficios_asignados."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."empleadoId" IS 'ID del Empleado que recibe el beneficio';


--
-- Name: COLUMN beneficios_asignados."beneficioId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.beneficios_asignados."beneficioId" IS 'ID del Beneficio otorgado';


--
-- Name: candidatos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.candidatos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telefono character varying(50),
    "cvUrl" character varying(500),
    "aiScore" integer,
    "aiAnalysis" text,
    estado character varying(50) DEFAULT 'NUEVO'::character varying NOT NULL,
    "fechaPostulacion" date DEFAULT ('now'::text)::date NOT NULL,
    "vacanteId" uuid NOT NULL
);


ALTER TABLE public.candidatos OWNER TO puntopymes;

--
-- Name: COLUMN candidatos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN candidatos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN candidatos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN candidatos.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos.nombre IS 'Nombre completo';


--
-- Name: COLUMN candidatos.email; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos.email IS 'Correo electrónico';


--
-- Name: COLUMN candidatos."cvUrl"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos."cvUrl" IS 'Link al CV';


--
-- Name: COLUMN candidatos."aiScore"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos."aiScore" IS 'Puntaje de coincidencia calculado por IA (0-100)';


--
-- Name: COLUMN candidatos."aiAnalysis"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.candidatos."aiAnalysis" IS 'Análisis cualitativo de la IA sobre el candidato';


--
-- Name: cargos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.cargos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(255) NOT NULL,
    "departamentoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    "salarioMin" double precision DEFAULT '0'::double precision,
    "salarioMax" double precision DEFAULT '0'::double precision,
    descripcion text,
    "empresaId" uuid
);


ALTER TABLE public.cargos OWNER TO puntopymes;

--
-- Name: COLUMN cargos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN cargos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN cargos.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos.nombre IS 'Nombre del puesto de trabajo';


--
-- Name: COLUMN cargos."departamentoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."departamentoId" IS 'ID del Departamento padre';


--
-- Name: COLUMN cargos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN cargos."salarioMin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."salarioMin" IS 'Salario mínimo de la banda salarial';


--
-- Name: COLUMN cargos."salarioMax"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."salarioMax" IS 'Salario máximo de la banda salarial';


--
-- Name: COLUMN cargos.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos.descripcion IS 'Descripción de las funciones del cargo';


--
-- Name: COLUMN cargos."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cargos."empresaId" IS 'ID de la empresa (desnormalizado para optimizar)';


--
-- Name: ciclos_evaluacion; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.ciclos_evaluacion (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(255) NOT NULL,
    "fechaInicio" date NOT NULL,
    "fechaFin" date NOT NULL,
    "empresaId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    estado character varying(50) DEFAULT 'PLANIFICACION'::character varying NOT NULL
);


ALTER TABLE public.ciclos_evaluacion OWNER TO puntopymes;

--
-- Name: COLUMN ciclos_evaluacion."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN ciclos_evaluacion."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN ciclos_evaluacion.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion.nombre IS 'Nombre del ciclo (Ej: Evaluación Anual 2025)';


--
-- Name: COLUMN ciclos_evaluacion."fechaInicio"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion."fechaInicio" IS 'Fecha de inicio del ciclo';


--
-- Name: COLUMN ciclos_evaluacion."fechaFin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion."fechaFin" IS 'Fecha de fin del ciclo';


--
-- Name: COLUMN ciclos_evaluacion."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion."empresaId" IS 'ID de la Empresa (Tenant) que ejecuta el ciclo';


--
-- Name: COLUMN ciclos_evaluacion."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN ciclos_evaluacion.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.ciclos_evaluacion.estado IS 'Estado del ciclo (PLANIFICACION, ACTIVO, CERRADO)';


--
-- Name: conceptos_nomina; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.conceptos_nomina (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    tipo public.conceptos_nomina_tipo_enum NOT NULL,
    "esFijo" boolean DEFAULT false NOT NULL,
    formula character varying(1000),
    "esAutomatico" boolean DEFAULT false NOT NULL,
    "montoEstimado" numeric(10,4),
    "empresaId" uuid NOT NULL
);


ALTER TABLE public.conceptos_nomina OWNER TO puntopymes;

--
-- Name: COLUMN conceptos_nomina."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN conceptos_nomina."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN conceptos_nomina."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN conceptos_nomina.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina.nombre IS 'Nombre del concepto (Salario Base, Aporte IESS)';


--
-- Name: COLUMN conceptos_nomina.tipo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina.tipo IS 'Tipo de rubro (Ingreso, Egreso)';


--
-- Name: COLUMN conceptos_nomina."esFijo"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."esFijo" IS 'Indica si es un monto fijo o recurrente (Legacy/Compatibilidad)';


--
-- Name: COLUMN conceptos_nomina.formula; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina.formula IS 'Fórmula para el cálculo (ej. "(salario / 30) * dias_trabajados")';


--
-- Name: COLUMN conceptos_nomina."esAutomatico"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."esAutomatico" IS 'Si es true, el motor de nómina lo calcula para todos sin asignación manual';


--
-- Name: COLUMN conceptos_nomina."montoEstimado"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."montoEstimado" IS 'Valor numérico base o porcentaje';


--
-- Name: COLUMN conceptos_nomina."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.conceptos_nomina."empresaId" IS 'ID de la Empresa (Tenant) a la que pertenece';


--
-- Name: contratos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.contratos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    tipo character varying(100) NOT NULL,
    salario double precision NOT NULL,
    moneda character varying(10) NOT NULL,
    "fechaInicio" date NOT NULL,
    "fechaFin" date,
    estado character varying(50) DEFAULT 'Vigente'::character varying NOT NULL,
    "empleadoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.contratos OWNER TO puntopymes;

--
-- Name: COLUMN contratos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN contratos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN contratos.tipo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos.tipo IS 'Tipo de contrato laboral';


--
-- Name: COLUMN contratos.salario; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos.salario IS 'Salario mensual nominal';


--
-- Name: COLUMN contratos.moneda; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos.moneda IS 'Código de moneda de pago (USD, EUR)';


--
-- Name: COLUMN contratos."fechaInicio"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos."fechaInicio" IS 'Fecha de inicio de vigencia del contrato';


--
-- Name: COLUMN contratos."fechaFin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos."fechaFin" IS 'Fecha de fin de vigencia (si aplica)';


--
-- Name: COLUMN contratos.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos.estado IS 'Estado del vínculo laboral (Vigente, Finalizado)';


--
-- Name: COLUMN contratos."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos."empleadoId" IS 'ID del Empleado al que pertenece el contrato';


--
-- Name: COLUMN contratos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.contratos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: cursos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.cursos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying(255) NOT NULL,
    descripcion text NOT NULL,
    duration character varying(50) NOT NULL,
    instructor character varying(150) NOT NULL,
    category character varying(100) NOT NULL,
    "imageUrl" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "empresaId" uuid NOT NULL
);


ALTER TABLE public.cursos OWNER TO puntopymes;

--
-- Name: COLUMN cursos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN cursos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN cursos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN cursos.titulo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos.titulo IS 'Título del curso';


--
-- Name: COLUMN cursos.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos.descripcion IS 'Descripción del contenido';


--
-- Name: COLUMN cursos.duration; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos.duration IS 'Ej: 10 horas, 30 min';


--
-- Name: COLUMN cursos.instructor; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos.instructor IS 'Nombre del instructor';


--
-- Name: COLUMN cursos.category; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos.category IS 'Tecnología, Ventas, etc.';


--
-- Name: COLUMN cursos."imageUrl"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.cursos."imageUrl" IS 'URL de la imagen';


--
-- Name: departamentos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.departamentos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(255) NOT NULL,
    "empresaId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    "sucursalId" uuid
);


ALTER TABLE public.departamentos OWNER TO puntopymes;

--
-- Name: COLUMN departamentos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.departamentos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN departamentos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.departamentos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN departamentos.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.departamentos.nombre IS 'Nombre del área o departamento';


--
-- Name: COLUMN departamentos."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.departamentos."empresaId" IS 'ID de la Empresa (Tenant) propietaria';


--
-- Name: COLUMN departamentos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.departamentos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN departamentos."sucursalId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.departamentos."sucursalId" IS 'ID de la Sucursal a la que pertenece';


--
-- Name: documentos_empleados; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.documentos_empleados (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    tipo character varying(100) NOT NULL,
    url character varying(500) NOT NULL,
    "fechaSubida" date DEFAULT ('now'::text)::date NOT NULL,
    "empleadoId" uuid NOT NULL
);


ALTER TABLE public.documentos_empleados OWNER TO puntopymes;

--
-- Name: COLUMN documentos_empleados."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empleados."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN documentos_empleados."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empleados."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN documentos_empleados."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empleados."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: documentos_empresa; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.documentos_empresa (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    descripcion text,
    url text NOT NULL,
    categoria character varying(50),
    "fechaSubida" date DEFAULT ('now'::text)::date NOT NULL,
    "empresaId" uuid NOT NULL,
    "sucursalId" uuid
);


ALTER TABLE public.documentos_empresa OWNER TO puntopymes;

--
-- Name: COLUMN documentos_empresa."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empresa."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN documentos_empresa."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empresa."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN documentos_empresa."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empresa."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN documentos_empresa.url; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empresa.url IS 'URL del archivo en S3/Cloudinary/Local';


--
-- Name: COLUMN documentos_empresa.categoria; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.documentos_empresa.categoria IS 'Ej: LEGAL, MANUALES, FORMATOS';


--
-- Name: empleados; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.empleados (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    "tipoIdentificacion" character varying(50),
    "nroIdentificacion" character varying(50),
    "emailPersonal" character varying(255),
    telefono character varying(50),
    direccion character varying(500),
    "fechaNacimiento" date,
    estado character varying(50) DEFAULT 'Activo'::character varying NOT NULL,
    "datosPersonalizados" jsonb,
    "empresaId" uuid NOT NULL,
    "usuarioId" uuid,
    "rolId" uuid NOT NULL,
    "cargoId" uuid NOT NULL,
    "jefeId" uuid,
    "deletedAt" timestamp with time zone,
    "fotoUrl" character varying(500),
    "sucursalId" uuid
);


ALTER TABLE public.empleados OWNER TO puntopymes;

--
-- Name: COLUMN empleados."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN empleados."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN empleados.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados.nombre IS 'Nombre del empleado';


--
-- Name: COLUMN empleados.apellido; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados.apellido IS 'Apellido del empleado';


--
-- Name: COLUMN empleados."tipoIdentificacion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."tipoIdentificacion" IS 'Tipo de documento de identidad';


--
-- Name: COLUMN empleados."nroIdentificacion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."nroIdentificacion" IS 'Número del documento de identidad';


--
-- Name: COLUMN empleados."emailPersonal"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."emailPersonal" IS 'Email personal de contacto';


--
-- Name: COLUMN empleados.telefono; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados.telefono IS 'Teléfono de contacto';


--
-- Name: COLUMN empleados.direccion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados.direccion IS 'Dirección de residencia';


--
-- Name: COLUMN empleados."fechaNacimiento"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."fechaNacimiento" IS 'Fecha de nacimiento';


--
-- Name: COLUMN empleados.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados.estado IS 'Estado de actividad (Activo, De Vacaciones, Licencia)';


--
-- Name: COLUMN empleados."datosPersonalizados"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."datosPersonalizados" IS 'Campos custom definidos por la empresa (RF)';


--
-- Name: COLUMN empleados."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."empresaId" IS 'ID de la Empresa (Tenant) a la que pertenece';


--
-- Name: COLUMN empleados."usuarioId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."usuarioId" IS 'ID del Usuario (login) asociado (opcional)';


--
-- Name: COLUMN empleados."rolId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."rolId" IS 'ID del Rol asignado en la empresa';


--
-- Name: COLUMN empleados."cargoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."cargoId" IS 'ID del Puesto/Cargo que ocupa';


--
-- Name: COLUMN empleados."jefeId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."jefeId" IS 'ID del manager/supervisor directo (otro Empleado)';


--
-- Name: COLUMN empleados."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN empleados."fotoUrl"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."fotoUrl" IS 'URL de la foto de perfil';


--
-- Name: COLUMN empleados."sucursalId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empleados."sucursalId" IS 'ID de la Sucursal a la que pertenece';


--
-- Name: empresas; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.empresas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(255) NOT NULL,
    "planSuscripcion" character varying(50) NOT NULL,
    branding jsonb,
    "deletedAt" timestamp with time zone,
    configuracion jsonb
);


ALTER TABLE public.empresas OWNER TO puntopymes;

--
-- Name: COLUMN empresas."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN empresas."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN empresas.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas.nombre IS 'Nombre de la empresa cliente';


--
-- Name: COLUMN empresas."planSuscripcion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas."planSuscripcion" IS 'Plan de suscripción (Basico, Pro, Enterprise)';


--
-- Name: COLUMN empresas.branding; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas.branding IS 'Logo y colores personalizados (RNF24)';


--
-- Name: COLUMN empresas."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN empresas.configuracion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.empresas.configuracion IS 'Configuraciones globales de la empresa (Nomina, Asistencia, etc)';


--
-- Name: encuesta_opciones; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.encuesta_opciones (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    texto character varying NOT NULL,
    votos integer DEFAULT 0 NOT NULL,
    "encuestaId" uuid NOT NULL
);


ALTER TABLE public.encuesta_opciones OWNER TO puntopymes;

--
-- Name: COLUMN encuesta_opciones."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.encuesta_opciones."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN encuesta_opciones."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.encuesta_opciones."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN encuesta_opciones."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.encuesta_opciones."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: encuestas; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.encuestas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying NOT NULL,
    descripcion text,
    "fechaFin" timestamp without time zone NOT NULL,
    "esAnonima" boolean DEFAULT false NOT NULL,
    activa boolean DEFAULT true NOT NULL,
    "empresaId" character varying NOT NULL,
    "sucursalId" uuid
);


ALTER TABLE public.encuestas OWNER TO puntopymes;

--
-- Name: COLUMN encuestas."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.encuestas."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN encuestas."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.encuestas."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN encuestas."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.encuestas."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: evaluaciones; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.evaluaciones (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "calificacionPotencial" integer NOT NULL,
    "calificacionDesempeno" integer NOT NULL,
    feedback text,
    "cicloId" uuid NOT NULL,
    "evaluadoId" uuid NOT NULL,
    "evaluadorId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.evaluaciones OWNER TO puntopymes;

--
-- Name: COLUMN evaluaciones."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN evaluaciones."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN evaluaciones."calificacionPotencial"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."calificacionPotencial" IS 'Calificación de potencial (1-9) para la Matriz 9-Box (RF-45-04)';


--
-- Name: COLUMN evaluaciones."calificacionDesempeno"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."calificacionDesempeno" IS 'Calificación de desempeño (1-9) para la Matriz 9-Box (RF-45-04)';


--
-- Name: COLUMN evaluaciones.feedback; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones.feedback IS 'Comentarios y feedback cualitativo de la evaluación';


--
-- Name: COLUMN evaluaciones."cicloId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."cicloId" IS 'ID del Ciclo de Evaluación al que pertenece';


--
-- Name: COLUMN evaluaciones."evaluadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."evaluadoId" IS 'ID del Empleado que está siendo evaluado';


--
-- Name: COLUMN evaluaciones."evaluadorId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."evaluadorId" IS 'ID del Empleado (manager) que realiza la evaluación';


--
-- Name: COLUMN evaluaciones."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.evaluaciones."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: inscripciones_cursos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.inscripciones_cursos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    estado character varying(50) DEFAULT 'Inscrito'::character varying NOT NULL,
    progreso integer DEFAULT 0 NOT NULL,
    calificacion double precision,
    "fechaInscripcion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaCompletado" timestamp without time zone,
    "cursoId" uuid NOT NULL,
    "empleadoId" uuid NOT NULL
);


ALTER TABLE public.inscripciones_cursos OWNER TO puntopymes;

--
-- Name: COLUMN inscripciones_cursos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN inscripciones_cursos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN inscripciones_cursos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN inscripciones_cursos.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos.estado IS 'Estado del progreso (Inscrito, Completado...)';


--
-- Name: COLUMN inscripciones_cursos.progreso; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos.progreso IS 'Porcentaje de avance del curso (0-100)';


--
-- Name: COLUMN inscripciones_cursos.calificacion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos.calificacion IS 'Nota final del curso (si aplica)';


--
-- Name: COLUMN inscripciones_cursos."fechaInscripcion"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos."fechaInscripcion" IS 'Fecha y hora de inscripción al curso';


--
-- Name: COLUMN inscripciones_cursos."fechaCompletado"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.inscripciones_cursos."fechaCompletado" IS 'Fecha y hora de finalización del curso';


--
-- Name: items_gasto; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.items_gasto (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    concepto character varying(255) NOT NULL,
    categoria character varying(50) NOT NULL,
    monto double precision NOT NULL,
    fecha date NOT NULL,
    "facturaUrl" character varying(1024),
    "reporteId" uuid NOT NULL
);


ALTER TABLE public.items_gasto OWNER TO puntopymes;

--
-- Name: COLUMN items_gasto."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN items_gasto."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN items_gasto."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN items_gasto.concepto; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto.concepto IS 'Concepto o descripción del gasto (Factura Hotel, Taxi)';


--
-- Name: COLUMN items_gasto.categoria; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto.categoria IS 'Categoría del gasto (Alimentación, Transporte, Hospedaje)';


--
-- Name: COLUMN items_gasto.monto; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto.monto IS 'Monto individual del gasto';


--
-- Name: COLUMN items_gasto.fecha; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto.fecha IS 'Fecha en que se realizó el gasto';


--
-- Name: COLUMN items_gasto."facturaUrl"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto."facturaUrl" IS 'URL del comprobante (Mongo/S3) (RNF13)';


--
-- Name: COLUMN items_gasto."reporteId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.items_gasto."reporteId" IS 'ID del Reporte padre al que pertenece';


--
-- Name: nominas_empleados; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.nominas_empleados (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "totalIngresos" double precision DEFAULT '0'::double precision NOT NULL,
    "totalEgresos" double precision DEFAULT '0'::double precision NOT NULL,
    "netoAPagar" double precision DEFAULT '0'::double precision NOT NULL,
    "periodoId" uuid NOT NULL,
    "empleadoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.nominas_empleados OWNER TO puntopymes;

--
-- Name: COLUMN nominas_empleados."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN nominas_empleados."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN nominas_empleados."totalIngresos"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."totalIngresos" IS 'Suma total de ingresos (calculado de los rubros)';


--
-- Name: COLUMN nominas_empleados."totalEgresos"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."totalEgresos" IS 'Suma total de deducciones (calculado de los rubros)';


--
-- Name: COLUMN nominas_empleados."netoAPagar"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."netoAPagar" IS 'Monto neto a pagar (TotalIngresos - TotalEgresos)';


--
-- Name: COLUMN nominas_empleados."periodoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."periodoId" IS 'ID del Periodo de Nómina al que pertenece';


--
-- Name: COLUMN nominas_empleados."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."empleadoId" IS 'ID del Empleado que recibe este pago';


--
-- Name: COLUMN nominas_empleados."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.nominas_empleados."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: novedades_nomina; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.novedades_nomina (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    valor numeric(10,2) NOT NULL,
    fecha date NOT NULL,
    observacion text,
    estado public.novedades_nomina_estado_enum DEFAULT 'Pendiente'::public.novedades_nomina_estado_enum NOT NULL,
    "empleadoId" uuid NOT NULL,
    "conceptoId" uuid NOT NULL,
    "empresaId" uuid NOT NULL
);


ALTER TABLE public.novedades_nomina OWNER TO puntopymes;

--
-- Name: COLUMN novedades_nomina."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.novedades_nomina."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN novedades_nomina."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.novedades_nomina."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN novedades_nomina."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.novedades_nomina."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN novedades_nomina.valor; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.novedades_nomina.valor IS 'Monetary value';


--
-- Name: COLUMN novedades_nomina.fecha; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.novedades_nomina.fecha IS 'Date of occurrence';


--
-- Name: objetivos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.objetivos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    descripcion text NOT NULL,
    progreso double precision DEFAULT '0'::double precision NOT NULL,
    "cicloId" uuid NOT NULL,
    "empleadoId" uuid,
    "deletedAt" timestamp with time zone,
    tipo character varying(50) DEFAULT 'PERSONAL'::character varying NOT NULL,
    "departamentoId" uuid,
    "parentObjetivoId" uuid
);


ALTER TABLE public.objetivos OWNER TO puntopymes;

--
-- Name: COLUMN objetivos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN objetivos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN objetivos.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos.descripcion IS 'Descripción del objetivo a medir';


--
-- Name: COLUMN objetivos.progreso; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos.progreso IS 'Porcentaje de progreso (0-100)';


--
-- Name: COLUMN objetivos."cicloId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."cicloId" IS 'ID del Ciclo de Evaluación';


--
-- Name: COLUMN objetivos."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."empleadoId" IS 'ID del Empleado (si es personal)';


--
-- Name: COLUMN objetivos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN objetivos.tipo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos.tipo IS 'Tipo de objetivo (PERSONAL, DEPARTAMENTO, EMPRESA)';


--
-- Name: COLUMN objetivos."departamentoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."departamentoId" IS 'ID del Departamento (si es grupal)';


--
-- Name: COLUMN objetivos."parentObjetivoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.objetivos."parentObjetivoId" IS 'ID de la Meta superior a la que contribuye';


--
-- Name: periodos_nomina; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.periodos_nomina (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "fechaInicio" date NOT NULL,
    "fechaFin" date NOT NULL,
    estado character varying(50) NOT NULL,
    "empresaId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.periodos_nomina OWNER TO puntopymes;

--
-- Name: COLUMN periodos_nomina."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN periodos_nomina."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN periodos_nomina."fechaInicio"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina."fechaInicio" IS 'Fecha de inicio del periodo de pago';


--
-- Name: COLUMN periodos_nomina."fechaFin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina."fechaFin" IS 'Fecha de fin del periodo de pago';


--
-- Name: COLUMN periodos_nomina.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina.estado IS 'Estado del procesamiento (Abierto, Procesando, Pagado)';


--
-- Name: COLUMN periodos_nomina."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina."empresaId" IS 'ID de la Empresa (Tenant) que procesa este periodo';


--
-- Name: COLUMN periodos_nomina."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.periodos_nomina."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: plantillas_onboarding; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.plantillas_onboarding (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying NOT NULL,
    "empresaId" uuid NOT NULL
);


ALTER TABLE public.plantillas_onboarding OWNER TO puntopymes;

--
-- Name: COLUMN plantillas_onboarding."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.plantillas_onboarding."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN plantillas_onboarding."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.plantillas_onboarding."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN plantillas_onboarding."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.plantillas_onboarding."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.proyectos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    "empresaId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    estado character varying(50) DEFAULT 'ACTIVO'::character varying NOT NULL,
    "liderId" uuid,
    "sucursalId" uuid
);


ALTER TABLE public.proyectos OWNER TO puntopymes;

--
-- Name: COLUMN proyectos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN proyectos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN proyectos.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos.nombre IS 'Nombre del proyecto';


--
-- Name: COLUMN proyectos.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos.descripcion IS 'Descripción detallada del proyecto';


--
-- Name: COLUMN proyectos."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos."empresaId" IS 'ID de la Empresa (Tenant) propietaria del proyecto';


--
-- Name: COLUMN proyectos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN proyectos.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos.estado IS 'Estado actual del proyecto';


--
-- Name: COLUMN proyectos."liderId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos."liderId" IS 'ID del Empleado (opcional) que lidera el proyecto';


--
-- Name: COLUMN proyectos."sucursalId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.proyectos."sucursalId" IS 'ID de la Sucursal a la que pertenece este proyecto';


--
-- Name: registros_asistencia; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.registros_asistencia (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "empleadoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    fecha date NOT NULL,
    "horaEntrada" timestamp without time zone NOT NULL,
    "horaSalida" timestamp without time zone,
    "totalHoras" double precision,
    estado character varying(50) DEFAULT 'ABIERTO'::character varying NOT NULL,
    observaciones text
);


ALTER TABLE public.registros_asistencia OWNER TO puntopymes;

--
-- Name: COLUMN registros_asistencia."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN registros_asistencia."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN registros_asistencia."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN registros_asistencia.fecha; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia.fecha IS 'Fecha de la jornada laboral';


--
-- Name: COLUMN registros_asistencia."horaEntrada"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia."horaEntrada" IS 'Hora de entrada';


--
-- Name: COLUMN registros_asistencia."horaSalida"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia."horaSalida" IS 'Hora de salida';


--
-- Name: COLUMN registros_asistencia."totalHoras"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia."totalHoras" IS 'Total de horas trabajadas en el día';


--
-- Name: COLUMN registros_asistencia.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.registros_asistencia.estado IS 'Estado (ABIERTO, CERRADO)';


--
-- Name: reportes_gasto; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.reportes_gasto (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying(255) NOT NULL,
    descripcion text,
    estado character varying(50) DEFAULT 'BORRADOR'::character varying NOT NULL,
    total double precision DEFAULT '0'::double precision NOT NULL,
    "fechaReporte" date DEFAULT ('now'::text)::date NOT NULL,
    "empleadoId" uuid NOT NULL
);


ALTER TABLE public.reportes_gasto OWNER TO puntopymes;

--
-- Name: COLUMN reportes_gasto."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN reportes_gasto."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN reportes_gasto."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN reportes_gasto.titulo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto.titulo IS 'Nombre o título del reporte (Ej: Viaje a Quito)';


--
-- Name: COLUMN reportes_gasto.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto.descripcion IS 'Descripción general del motivo del gasto';


--
-- Name: COLUMN reportes_gasto.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto.estado IS 'Estado (BORRADOR, PENDIENTE, APROBADO...)';


--
-- Name: COLUMN reportes_gasto.total; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto.total IS 'Monto total de los gastos reportados';


--
-- Name: COLUMN reportes_gasto."fechaReporte"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto."fechaReporte" IS 'Fecha de creación del reporte';


--
-- Name: COLUMN reportes_gasto."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.reportes_gasto."empleadoId" IS 'ID del Empleado que genera el reporte';


--
-- Name: roles; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(100) NOT NULL,
    permisos jsonb DEFAULT '[]'::jsonb NOT NULL,
    "empresaId" uuid NOT NULL,
    "deletedAt" timestamp with time zone,
    "esDefecto" boolean DEFAULT false NOT NULL,
    descripcion character varying(500)
);


ALTER TABLE public.roles OWNER TO puntopymes;

--
-- Name: COLUMN roles."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN roles."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN roles.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles.nombre IS 'Nombre del rol (Admin, Empleado, Manager)';


--
-- Name: COLUMN roles.permisos; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles.permisos IS 'Lista de permisos activos (Array de strings)';


--
-- Name: COLUMN roles."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles."empresaId" IS 'ID de la Empresa (Tenant) propietaria del rol';


--
-- Name: COLUMN roles."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN roles."esDefecto"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles."esDefecto" IS 'Si es true, este rol se asigna automáticamente a nuevos empleados';


--
-- Name: COLUMN roles.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.roles.descripcion IS 'Descripción del rol';


--
-- Name: rubros_nomina; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.rubros_nomina (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    tipo character varying(50) NOT NULL,
    concepto character varying(255) NOT NULL,
    valor double precision NOT NULL,
    "nominaEmpleadoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.rubros_nomina OWNER TO puntopymes;

--
-- Name: COLUMN rubros_nomina."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN rubros_nomina."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN rubros_nomina.tipo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina.tipo IS 'Tipo de rubro (Ingreso, Egreso)';


--
-- Name: COLUMN rubros_nomina.concepto; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina.concepto IS 'Concepto/descripción del rubro (Salario Base, Aporte IESS)';


--
-- Name: COLUMN rubros_nomina.valor; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina.valor IS 'Monto del rubro (positivo para Ingreso, negativo para Egreso)';


--
-- Name: COLUMN rubros_nomina."nominaEmpleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina."nominaEmpleadoId" IS 'ID de la Nómina (rol de pago) a la que pertenece esta línea';


--
-- Name: COLUMN rubros_nomina."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.rubros_nomina."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: solicitudes_vacaciones; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.solicitudes_vacaciones (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "fechaInicio" date NOT NULL,
    "fechaFin" date NOT NULL,
    "diasSolicitados" integer NOT NULL,
    estado character varying(50) DEFAULT 'PENDIENTE'::character varying NOT NULL,
    comentario text,
    "respuestaAdmin" text,
    "empleadoId" uuid NOT NULL,
    "comentariosRespuesta" text,
    "fechaRespuesta" timestamp without time zone
);


ALTER TABLE public.solicitudes_vacaciones OWNER TO puntopymes;

--
-- Name: COLUMN solicitudes_vacaciones."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN solicitudes_vacaciones."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN solicitudes_vacaciones."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN solicitudes_vacaciones."fechaInicio"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."fechaInicio" IS 'Fecha de inicio de las vacaciones';


--
-- Name: COLUMN solicitudes_vacaciones."fechaFin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."fechaFin" IS 'Fecha de fin de las vacaciones';


--
-- Name: COLUMN solicitudes_vacaciones."diasSolicitados"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."diasSolicitados" IS 'Cantidad de días solicitados';


--
-- Name: COLUMN solicitudes_vacaciones.comentario; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones.comentario IS 'Motivo o comentario del empleado';


--
-- Name: COLUMN solicitudes_vacaciones."respuestaAdmin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.solicitudes_vacaciones."respuestaAdmin" IS 'Respuesta del aprobador';


--
-- Name: sprints; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.sprints (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    nombre character varying(255) NOT NULL,
    "fechaInicio" date NOT NULL,
    "fechaFin" date NOT NULL,
    "proyectoId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.sprints OWNER TO puntopymes;

--
-- Name: COLUMN sprints."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN sprints."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN sprints.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints.nombre IS 'Nombre o identificador del sprint';


--
-- Name: COLUMN sprints."fechaInicio"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints."fechaInicio" IS 'Fecha de inicio del sprint';


--
-- Name: COLUMN sprints."fechaFin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints."fechaFin" IS 'Fecha de fin del sprint';


--
-- Name: COLUMN sprints."proyectoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints."proyectoId" IS 'ID del Proyecto padre';


--
-- Name: COLUMN sprints."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sprints."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: sucursales; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.sucursales (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    nombre character varying(255) NOT NULL,
    direccion character varying(500),
    telefono character varying(50),
    activa boolean DEFAULT true NOT NULL,
    "empresaId" uuid NOT NULL,
    "jefeId" uuid
);


ALTER TABLE public.sucursales OWNER TO puntopymes;

--
-- Name: COLUMN sucursales."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sucursales."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN sucursales."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sucursales."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN sucursales."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sucursales."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN sucursales.nombre; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.sucursales.nombre IS 'Nombre de la sucursal (ej: Matriz Quito)';


--
-- Name: tareas; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.tareas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying(255) NOT NULL,
    descripcion text,
    "puntosHistoria" integer DEFAULT 0,
    estado character varying(50) DEFAULT 'PENDIENTE'::character varying NOT NULL,
    prioridad character varying(50) DEFAULT 'MEDIA'::character varying NOT NULL,
    "proyectoId" uuid NOT NULL,
    "sprintId" uuid,
    "objetivoId" uuid
);


ALTER TABLE public.tareas OWNER TO puntopymes;

--
-- Name: COLUMN tareas."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN tareas."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN tareas."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN tareas.titulo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas.titulo IS 'Título de la tarea';


--
-- Name: COLUMN tareas.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas.descripcion IS 'Descripción detallada de la tarea';


--
-- Name: COLUMN tareas."puntosHistoria"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."puntosHistoria" IS 'Puntos de historia (Estimación)';


--
-- Name: COLUMN tareas.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas.estado IS 'Estado actual de la tarea';


--
-- Name: COLUMN tareas.prioridad; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas.prioridad IS 'Nivel de prioridad (BAJA, MEDIA, ALTA)';


--
-- Name: COLUMN tareas."proyectoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."proyectoId" IS 'ID del Proyecto padre';


--
-- Name: COLUMN tareas."sprintId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."sprintId" IS 'ID del Sprint al que pertenece (opcional)';


--
-- Name: COLUMN tareas."objetivoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas."objetivoId" IS 'Objetivo estratégico vinculado';


--
-- Name: tareas_empleado; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.tareas_empleado (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "empleadoId" uuid NOT NULL,
    titulo character varying NOT NULL,
    descripcion text NOT NULL,
    enlace character varying,
    completado boolean DEFAULT false NOT NULL,
    "plantillaOrigenId" uuid
);


ALTER TABLE public.tareas_empleado OWNER TO puntopymes;

--
-- Name: COLUMN tareas_empleado."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas_empleado."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN tareas_empleado."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas_empleado."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN tareas_empleado."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas_empleado."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: tareas_plantilla; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.tareas_plantilla (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying NOT NULL,
    descripcion text NOT NULL,
    enlace character varying,
    "plantillaId" uuid
);


ALTER TABLE public.tareas_plantilla OWNER TO puntopymes;

--
-- Name: COLUMN tareas_plantilla."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas_plantilla."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN tareas_plantilla."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas_plantilla."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN tareas_plantilla."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.tareas_plantilla."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: timesheets; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.timesheets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    fecha date NOT NULL,
    horas double precision NOT NULL,
    "empleadoId" uuid NOT NULL,
    "tareaId" uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.timesheets OWNER TO puntopymes;

--
-- Name: COLUMN timesheets."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN timesheets."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN timesheets.fecha; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets.fecha IS 'Fecha del registro de horas';


--
-- Name: COLUMN timesheets.horas; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets.horas IS 'Cantidad de horas trabajadas';


--
-- Name: COLUMN timesheets."empleadoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets."empleadoId" IS 'ID del Empleado que reporta el tiempo';


--
-- Name: COLUMN timesheets."tareaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets."tareaId" IS 'ID de la Tarea en la que se trabajó';


--
-- Name: COLUMN timesheets."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.timesheets."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    email character varying(255) NOT NULL,
    "passwordHash" character varying(255) NOT NULL,
    "emailVerificado" boolean DEFAULT false NOT NULL,
    "twoFactorSecret" character varying(255),
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.usuarios OWNER TO puntopymes;

--
-- Name: COLUMN usuarios."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN usuarios."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN usuarios.email; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios.email IS 'Email de login, único globalmente';


--
-- Name: COLUMN usuarios."passwordHash"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios."passwordHash" IS 'Hash de la contraseña (bcrypt)';


--
-- Name: COLUMN usuarios."emailVerificado"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios."emailVerificado" IS 'Estado de verificación de email';


--
-- Name: COLUMN usuarios."twoFactorSecret"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios."twoFactorSecret" IS 'Secreto para 2FA (RNF16)';


--
-- Name: COLUMN usuarios."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.usuarios."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: vacantes; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.vacantes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    titulo character varying(255) NOT NULL,
    descripcion text NOT NULL,
    requisitos text,
    estado character varying(50) DEFAULT 'BORRADOR'::character varying NOT NULL,
    ubicacion character varying(100),
    "salarioMin" double precision,
    "salarioMax" double precision,
    "fechaCierre" date,
    "empresaId" uuid NOT NULL,
    "departamentoId" uuid,
    "sucursalId" uuid
);


ALTER TABLE public.vacantes OWNER TO puntopymes;

--
-- Name: COLUMN vacantes."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN vacantes."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN vacantes."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Name: COLUMN vacantes.titulo; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes.titulo IS 'Título del puesto (Ej: Desarrollador Senior)';


--
-- Name: COLUMN vacantes.descripcion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes.descripcion IS 'Descripción detallada de las responsabilidades';


--
-- Name: COLUMN vacantes.requisitos; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes.requisitos IS 'Requisitos técnicos y habilidades blandas';


--
-- Name: COLUMN vacantes.estado; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes.estado IS 'Estado de la vacante (PUBLICA, BORRADOR...)';


--
-- Name: COLUMN vacantes.ubicacion; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes.ubicacion IS 'Ubicación (Ej: Remoto, Quito, Híbrido)';


--
-- Name: COLUMN vacantes."salarioMin"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."salarioMin" IS 'Salario mínimo ofrecido';


--
-- Name: COLUMN vacantes."salarioMax"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."salarioMax" IS 'Salario máximo ofrecido';


--
-- Name: COLUMN vacantes."fechaCierre"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."fechaCierre" IS 'Fecha límite para postular';


--
-- Name: COLUMN vacantes."empresaId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."empresaId" IS 'ID de la Empresa';


--
-- Name: COLUMN vacantes."departamentoId"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.vacantes."departamentoId" IS 'ID del Departamento solicitante';


--
-- Name: votos; Type: TABLE; Schema: public; Owner: puntopymes
--

CREATE TABLE public.votos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "empleadoId" character varying NOT NULL,
    "encuestaId" uuid NOT NULL,
    "opcionId" uuid NOT NULL
);


ALTER TABLE public.votos OWNER TO puntopymes;

--
-- Name: COLUMN votos."createdAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.votos."createdAt" IS 'Fecha de creación del registro';


--
-- Name: COLUMN votos."updatedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.votos."updatedAt" IS 'Fecha de última actualización del registro';


--
-- Name: COLUMN votos."deletedAt"; Type: COMMENT; Schema: public; Owner: puntopymes
--

COMMENT ON COLUMN public.votos."deletedAt" IS 'Fecha de borrado lógico (soft delete)';


--
-- Data for Name: activos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.activos (id, "createdAt", "updatedAt", "deletedAt", nombre, descripcion, serial, tipo, estado, valor, "imageUrl", "fechaAdquisicion", "empresaId", "sucursalId") FROM stdin;
7670e124-c877-4af3-8516-3a7598844dd6	2025-12-18 16:41:22.363943+00	2025-12-18 16:55:50.140231+00	\N	Prueba		\N	Prueba	DISPONIBLE	0		2025-12-27	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N
6e5221f4-63cc-4aa5-8416-4c2255619cb0	2025-12-18 16:36:19.534689+00	2025-12-18 21:28:24.600183+00	\N	Computadora Dell		S/N	Computación	EN_REPARACION	1500		2025-12-18	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N
08d85776-73b1-4572-91eb-e8486baf5409	2025-12-18 16:36:36.035302+00	2025-12-18 21:29:00.642013+00	\N	Celular Huaweii		\N	Movil	DISPONIBLE	300		2025-12-18	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N
b006ea1c-f128-4743-aaba-11aedc41b459	2025-12-20 23:21:02.934864+00	2025-12-20 23:22:45.884815+00	\N	Laptop Dell	Compu	\N	Computación	DISPONIBLE	1000		2025-12-20	a5edc1dd-9410-4a40-986b-d280e10af715	dd146528-e6c8-4970-a572-10e7b6f94429
\.


--
-- Data for Name: activos_asignados; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.activos_asignados (id, "createdAt", "updatedAt", "deletedAt", "fechaAsignacion", "fechaDevolucion", estado, observaciones, "activoId", "empleadoId") FROM stdin;
485e8e23-162d-43be-8b08-90bd920fee75	2025-12-18 21:05:35.528326+00	2025-12-18 21:28:24.613359+00	\N	2025-12-18	2025-12-18	DEVUELTO	Dañó la pantalla 	6e5221f4-63cc-4aa5-8416-4c2255619cb0	c52bd81b-9341-434f-9364-6817bfc82885
8f0f8035-29a6-41c9-946d-d372a174eea2	2025-12-18 21:28:44.940847+00	2025-12-18 21:29:00.648497+00	\N	2025-12-18	2025-12-18	DEVUELTO	Todo bien	08d85776-73b1-4572-91eb-e8486baf5409	70847fc0-7314-40d8-9b93-82763c14d4b9
ebf25f10-24aa-44fb-b89d-b44210bbd377	2025-12-20 23:22:38.328149+00	2025-12-20 23:22:45.892596+00	\N	2025-12-20	2025-12-20	DEVUELTO	Todo Bien	b006ea1c-f128-4743-aaba-11aedc41b459	99d62f5a-86e8-4844-9488-1da5bde6317c
\.


--
-- Data for Name: anuncios; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.anuncios (id, "createdAt", "updatedAt", "deletedAt", titulo, contenido, prioridad, "fechaExpiracion", "empresaId", "sucursalId") FROM stdin;
05d5bc2f-e576-4b6a-b15f-ad8e463bb77c	2025-12-23 15:46:00.472849+00	2025-12-23 15:46:00.472849+00	\N	Muchachos Ola	Aca digo ola	MEDIA	2025-12-24 05:00:00	a5edc1dd-9410-4a40-986b-d280e10af715	\N
9fa9196d-ef3e-48d8-be3a-69377e66940d	2025-12-23 15:46:24.846021+00	2025-12-23 15:46:24.846021+00	\N	Ola pero solo para zamora	Ola Zamora	ALTA	2025-12-24 05:00:00	a5edc1dd-9410-4a40-986b-d280e10af715	e305608f-24d0-46f4-892a-04dd92817db6
127a524c-2b1f-4292-a87b-4450ae15ffae	2025-12-23 15:46:48.617236+00	2025-12-23 15:46:48.617236+00	\N	Este si es para zamora?	aaaavcasdkljasd	MEDIA	2025-12-24 05:00:00	a5edc1dd-9410-4a40-986b-d280e10af715	e305608f-24d0-46f4-892a-04dd92817db6
\.


--
-- Data for Name: asignaciones_tareas; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.asignaciones_tareas (id, "createdAt", "updatedAt", "tareaId", "empleadoId", "deletedAt", observaciones, "fechaAsignacion") FROM stdin;
72125786-f584-4f5d-bd38-99defd20ee2e	2025-11-19 21:39:20.941689+00	2025-11-19 21:39:20.941689+00	cdbb5cd4-2d20-46ed-abb9-d7a6b72f8626	cc6e191b-6566-46b7-8ed3-3ada5364414d	\N	Encargado del desarrollo del Backend.	2025-11-19 21:39:20.941689
\.


--
-- Data for Name: beneficios; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.beneficios (id, "createdAt", "updatedAt", "deletedAt", nombre, descripcion, tipo, "esAutomatico", "porcentajeCalculo", indicador, "esRecurrente", "montoEstimado", "empresaId") FROM stdin;
ee423b74-2dac-4902-b1a9-83d3bbe38345	2025-12-13 20:16:47.226807+00	2025-12-13 20:16:47.226807+00	\N	Gimnasio	Creado desde configuración	Monetario	f	\N	Descuento	t	22.00	d845d7a9-9dcf-4db3-95f3-131b93e40673
4ff1d788-7e38-49e3-ad77-f4d99240acb0	2025-12-16 16:55:47.37921+00	2025-12-16 16:55:47.37921+00	\N	Seguro Medico	Creado desde configuración	Monetario	f	\N	Descuento	t	30.00	d845d7a9-9dcf-4db3-95f3-131b93e40673
ca336a88-0f24-4bad-b9df-2f4228ab9509	2025-12-17 16:19:50.442479+00	2025-12-17 16:19:50.442479+00	\N	Aporte Seguro	Creado desde configuración	Monetario	f	\N	Descuento	t	0.11	d845d7a9-9dcf-4db3-95f3-131b93e40673
\.


--
-- Data for Name: beneficios_asignados; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.beneficios_asignados (id, "createdAt", "updatedAt", "deletedAt", "fechaAsignacion", "montoPersonalizado", activo, "empleadoId", "beneficioId") FROM stdin;
32206b41-1723-48e4-a621-843ea25570e3	2025-12-16 03:49:20.359282+00	2025-12-16 03:49:20.359282+00	\N	2025-12-16	\N	t	03bfc407-1509-4e5e-82e4-ca7b3e348aab	ee423b74-2dac-4902-b1a9-83d3bbe38345
f4266bed-6716-43c1-aaea-3642e5136f68	2025-12-16 03:49:20.359282+00	2025-12-16 03:49:20.359282+00	\N	2025-12-16	\N	t	70847fc0-7314-40d8-9b93-82763c14d4b9	ee423b74-2dac-4902-b1a9-83d3bbe38345
477a65fe-8513-49d6-8c79-3233a14081ae	2025-12-16 03:49:20.359282+00	2025-12-16 03:49:20.359282+00	\N	2025-12-16	\N	t	7ca7fc59-9a54-4639-9693-e22e33a63244	ee423b74-2dac-4902-b1a9-83d3bbe38345
01360b80-2232-4a3a-9f25-e2020b49b1e2	2025-12-16 03:49:20.359282+00	2025-12-16 03:49:20.359282+00	\N	2025-12-16	\N	t	6f912371-9183-4516-90b1-9d53c8a6b491	ee423b74-2dac-4902-b1a9-83d3bbe38345
4b1ab782-5741-4972-abaa-23b9be932423	2025-12-16 16:56:52.846638+00	2025-12-16 16:56:52.846638+00	\N	2025-12-16	\N	t	cc6e191b-6566-46b7-8ed3-3ada5364414d	ee423b74-2dac-4902-b1a9-83d3bbe38345
26fa6363-0d38-4ffb-91dc-adfeb52a7372	2025-12-16 16:56:52.846638+00	2025-12-16 16:56:52.846638+00	\N	2025-12-16	\N	t	fa703991-ff73-4097-825b-19355d867255	ee423b74-2dac-4902-b1a9-83d3bbe38345
2dd8e4a7-47db-4752-8ea8-be5a14e0574d	2025-12-16 16:56:52.846638+00	2025-12-16 16:56:52.846638+00	\N	2025-12-16	\N	t	c52bd81b-9341-434f-9364-6817bfc82885	ee423b74-2dac-4902-b1a9-83d3bbe38345
79f56edb-b842-41c5-906b-07686e73126a	2025-12-16 16:56:52.846638+00	2025-12-16 16:56:52.846638+00	\N	2025-12-16	\N	t	c351bc6e-bb11-4738-8fe0-db467bd6e1ce	ee423b74-2dac-4902-b1a9-83d3bbe38345
\.


--
-- Data for Name: candidatos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.candidatos (id, "createdAt", "updatedAt", "deletedAt", nombre, email, telefono, "cvUrl", "aiScore", "aiAnalysis", estado, "fechaPostulacion", "vacanteId") FROM stdin;
f1d3e556-426a-4c98-ad80-8f6331069ace	2025-11-21 06:15:55.718714+00	2025-11-21 16:42:09.893577+00	\N	Erick Rodas	erickrodas559@gmail.com	0995520577	http://localhost:3000/uploads/public/vacantes/15c7ea4d-403d-4280-9364-d7c3d6ea6956/candidatos/38d87314f5b18854dd95a4fce5e1a9e4.pdf	45	El candidato tiene conocimientos en Node.js y FastAPI, pero carece de experiencia en NestJS, AWS y Docker. Su nivel de inglés es avanzado. La experiencia laboral es limitada (desde Nov 2023).	NUEVO	2025-11-21	15c7ea4d-403d-4280-9364-d7c3d6ea6956
94457f07-2bec-4ef9-a325-9304ed4a3343	2025-11-21 06:34:33.434735+00	2025-11-21 16:45:19.009555+00	\N	Eri Rod	erickrodasa559@gmail.com	5930995520577	http://localhost:3000/uploads/public/vacantes/15c7ea4d-403d-4280-9364-d7c3d6ea6956/candidatos/ca536de11075f452be8f1d61ed48ffeff.pdf	15	El candidato carece de la experiencia requerida (5+ años). Aunque menciona Java y Javascript, no hay evidencia de NestJS, Microservicios, AWS o Docker. El nivel de inglés indicado como 'Fluent' es un punto positivo, pero insuficiente.	NUEVO	2025-11-21	15c7ea4d-403d-4280-9364-d7c3d6ea6956
9bb976bc-993f-4d62-904d-f57c8e6d647e	2025-12-02 04:00:21.960575+00	2025-12-02 04:00:25.826414+00	\N	Postulante Prueba	ruby02591@gmail.com	+593995520577	http://localhost:3000/uploads/public/vacantes/15c7ea4d-403d-4280-9364-d7c3d6ea6956/candidatos/7c9d35befb40e82f69ecd105d1bb6e3f.pdf	60	El candidato tiene experiencia en Node.js (mencionado como Node.js Developer), pero no se menciona explícitamente NestJS ni microservicios. Tiene más de 5 años de experiencia. AWS y Docker no aparecen en el CV. El nivel de inglés no se puede determinar.	NUEVO	2025-12-02	15c7ea4d-403d-4280-9364-d7c3d6ea6956
170e33bd-ee1f-40e7-bdee-32d0e8e3a1c3	2025-12-03 22:08:22.469903+00	2025-12-03 22:08:26.512918+00	\N	AAAAAA	fddkfkhfkhg@gmail.com	7897987	http://localhost:3000/uploads/public/vacantes/15c7ea4d-403d-4280-9364-d7c3d6ea6956/candidatos/bb489107879e5cc4eacb64928bdfbf912.pdf	65	El candidato tiene experiencia en Node.js, que es un buen punto de partida. Sin embargo, no menciona explícitamente NestJS, Microservicios, AWS o Docker. Su experiencia laboral es relevante, pero la falta de habilidades específicas reduce su puntuación.	NUEVO	2025-12-03	15c7ea4d-403d-4280-9364-d7c3d6ea6956
f64c3cfc-7a65-43f7-bd86-977d0ceb5d11	2025-12-20 23:39:18.468182+00	2025-12-20 23:48:21.788609+00	\N	Ricardo Ricky	erickrodas55@gmail.com	+593995520577	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/d5a45415b77a2da6aa8610de10b48f10f87.pdf	\N	Error en análisis automático: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\nPlease retry in 35.297076951s. [{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_input_token_count","quotaId":"GenerateContentInputTokensPerModelPerMinute-FreeTier","quotaDimensions":{"model":"gemini-2.0-flash","location":"global"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerDayPerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"35s"}]	REVISION	2025-12-20	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
380b9c64-c306-48b8-adb9-6c5a19a09b44	2025-12-20 23:58:39.104581+00	2025-12-20 23:58:57.306335+00	\N	Valentina Samaniego	ruby02591@gmail.com	0995520577	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/b9518b8924dc327889fc0921ff0995f4.pdf	\N	Error en análisis automático: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\nPlease retry in 59.767236076s. [{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_input_token_count","quotaId":"GenerateContentInputTokensPerModelPerMinute-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerDayPerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"59s"}]	REVISION	2025-12-20	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
a821d10c-a915-46e6-96ff-4c1fdc942d3a	2025-12-21 00:01:58.708107+00	2025-12-21 00:02:16.715239+00	\N	Jeimy Torres	jatorres99@gmail.com	9129301231	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/fc215bf38c2134205a3101aeb84f5f055.pdf	\N	Error en análisis automático: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\nPlease retry in 40.348518231s. [{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_input_token_count","quotaId":"GenerateContentInputTokensPerModelPerMinute-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerDayPerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"40s"}]	REVISION	2025-12-21	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
637b04a6-10cc-4878-8a82-4318a415a959	2025-12-21 00:18:16.643142+00	2025-12-21 00:18:34.569288+00	\N	Sujeto Prueba	correo@correo.com	819231321	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/994649c3eb7cc95e40b14e8a44efd4b5.pdf	\N	Error en análisis automático: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\nPlease retry in 22.485790043s. [{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_input_token_count","quotaId":"GenerateContentInputTokensPerModelPerMinute-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerDayPerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"22s"}]	REVISION	2025-12-21	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
70d6df9e-3875-4ff9-a67e-cece99a727fb	2025-12-21 00:20:27.384217+00	2025-12-21 00:20:27.938612+00	\N	PRUEBA 2	prueba@prueba.com	091391203021	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/311b1092d11543a0be4a2a10e6ef5b381.pdf	\N	Error en análisis automático: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [404 Not Found] models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.	REVISION	2025-12-21	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
49df8401-d751-4a89-aad1-22d1b6cf3a27	2025-12-21 00:26:20.564753+00	2025-12-21 00:27:03.420287+00	\N	PRUEBA 3 PORFAVOR	pruebaweim@email.com	23490123	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/94fb3188f43f0144a6fa649671afe398.pdf	\N	Fallo: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash\nPlease retry in 53.610857313s. [{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_input_token_count","quotaId":"GenerateContentInputTokensPerModelPerMinute-FreeTier","quotaDimensions":{"model":"gemini-2.0-flash","location":"global"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerMinutePerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}},{"quotaMetric":"generativelanguage.googleapis.com/generate_content_free_tier_requests","quotaId":"GenerateRequestsPerDayPerProjectPerModel-FreeTier","quotaDimensions":{"location":"global","model":"gemini-2.0-flash"}}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"53s"}]	REVISION	2025-12-21	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
b1488b7b-594c-4915-bf96-0b10f74a879f	2025-12-21 00:29:42.83523+00	2025-12-21 00:29:50.939707+00	\N	PRUEBA 4 GABY	gaby@gaby.com	0193091232	http://localhost:3000/uploads/public/vacantes/1b126ba5-8f25-4cea-9cdf-4e8116a3c95c/candidatos/6e0a92cd7fb1865bf6334a8dd04232d6.pdf	95	El candidato es un ajuste técnico excelente. Posee 10 años de experiencia avanzada en análisis de datos, SQL, Python y data warehousing, cumpliendo con creces el perfil de 'Analista de Base de Datos'. Sus logros demuestran directamente la capacidad de tomar decisiones para reducir costos y mejorar la productividad (ej. 86% de ahorro de mano de obra y aumento del 92% en eficiencia), que es el objetivo principal de la vacante. Aunque su título actual es 'Junior Data Analyst', su experiencia y resultados cuantificados lo hacen un candidato muy fuerte para el rol Senior. El requisito de 'Trabajo en Equipo' se evidencia a través de la gestión de stakeholders y la colaboración en el desarrollo de aplicaciones.	NUEVO	2025-12-21	1b126ba5-8f25-4cea-9cdf-4e8116a3c95c
\.


--
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.cargos (id, "createdAt", "updatedAt", nombre, "departamentoId", "deletedAt", "salarioMin", "salarioMax", descripcion, "empresaId") FROM stdin;
3420e657-2590-4b90-b767-ae21ce4376ad	2025-11-08 05:57:28.62905+00	2025-11-08 05:57:28.62905+00	Administrador	eefa3998-7a2d-4f4d-be0f-54e8acfb8231	\N	0	0	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673
31cd3ee8-eab6-4c25-97ac-4f7fea9fb029	2025-12-04 16:37:26.705548+00	2025-12-04 16:37:26.705548+00	Programador Django	7ee03611-e52b-424a-bca8-345a82d368b0	\N	2000	3000	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673
e22c878e-b03f-4139-adbc-9bce341e744a	2025-11-23 05:15:20.806607+00	2025-11-23 05:15:20.806607+00	Programador Back	7ee03611-e52b-424a-bca8-345a82d368b0	\N	1000	3000	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673
47d66cbe-c18f-46ab-9884-4a9d3dfd393e	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	Administrador	024860da-5fec-4fd8-8e9e-0881d96c38ff	\N	0	0	\N	8904d395-93eb-4171-b148-fe9f10133955
8e9af25c-a6ff-4e22-85b6-8932d8f47502	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	Administrador	f28d5149-727c-4c0f-aef3-6695745b7587	\N	0	0	\N	61e81ec9-8d21-460b-81b3-addc2df089a4
a9e3d811-866c-48b9-89ca-10ece66e44bf	2025-12-19 03:31:35.735563+00	2025-12-19 03:34:02.624264+00	1500	d3da9e1a-51c0-431e-9668-a4c6727e242f	2025-12-19 03:34:02.624264+00	1200	1800	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
a31e4b6b-4969-4357-b63d-055619e46ec8	2025-12-19 03:31:38.281478+00	2025-12-19 03:34:04.975876+00	$ 2,500.50	d3da9e1a-51c0-431e-9668-a4c6727e242f	2025-12-19 03:34:04.975876+00	2200.5	2800.5	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
e9110198-ff1c-469a-aed4-0883863a4c75	2025-12-19 03:31:38.705877+00	2025-12-19 03:34:07.408202+00	3200	d3da9e1a-51c0-431e-9668-a4c6727e242f	2025-12-19 03:34:07.408202+00	2900	3500	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
4e7181fc-d7ce-4375-ad2a-38042329b4b6	2025-12-19 03:31:40.983339+00	2025-12-19 03:34:08.755107+00	800	d3da9e1a-51c0-431e-9668-a4c6727e242f	2025-12-19 03:34:08.755107+00	500	1100	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
42f62faa-1138-4a89-aa8a-bb6cc20f1dd2	2025-12-19 03:37:09.46126+00	2025-12-19 03:37:09.46126+00	Desarrollador Senior	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N	1200	1800	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
c1ce3c64-8ce5-4c58-aa6f-ff1b6193002a	2025-12-19 03:37:11.6682+00	2025-12-19 03:37:11.6682+00	Contadora	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N	2200.5	2800.5	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
b412ab68-c302-4088-aa06-03a371a2eeaa	2025-12-19 03:37:13.733905+00	2025-12-19 03:37:13.733905+00	Gerente de Ventas	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N	2900	3500	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
d9367fa0-1102-465b-bb01-20b5b5eb3dcc	2025-12-19 03:37:15.665561+00	2025-12-19 03:37:15.665561+00	Asistente	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N	500	1100	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
6791436f-bee5-461b-b827-cbae46517240	2025-12-19 03:37:17.468676+00	2025-12-19 03:37:17.468676+00	Sin Cargo Asignado	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N	100	700	Generado automáticamente por Importación Masiva	d845d7a9-9dcf-4db3-95f3-131b93e40673
90c299da-fd74-494e-9772-241c22ee039c	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Gerente General	09cff220-ff38-4ae4-86ef-7f1d93bac88c	\N	0	0	\N	\N
236e81ac-094f-4ca6-b9a7-3de7c7a57f82	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Gerente General	afd4869b-2484-49b5-a17e-227d7ba49ccd	\N	0	0	\N	\N
bc0905e3-1a71-4bda-b0d4-945fd1d14045	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Gerente General	5bc08bfd-ac0e-4125-a935-a4a62a52cd5b	\N	0	0	\N	\N
1315832e-f24d-449e-8b33-df2dfeb900e2	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Gerente General	d4ed7407-3dea-4c27-ab8d-20b9a3cceea9	\N	0	0	\N	\N
a390fd2f-fdb5-4d54-b396-3dffd82198ec	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Gerente General	97e69216-a0c4-4346-a7f9-1f2f96e91eca	\N	0	0	\N	\N
53d2d98d-210e-4a4e-8205-35a0853fe8df	2025-12-20 06:30:01.612+00	2025-12-20 06:30:01.612+00	Gerente General	33655640-aafb-469d-8d8d-89fd0d2d04a9	\N	0	0	\N	\N
7a58b83c-9826-4009-b18e-1f8901aab279	2025-12-20 19:14:06.713653+00	2025-12-20 19:14:06.713653+00	Desarrollador Senior	33655640-aafb-469d-8d8d-89fd0d2d04a9	\N	1200	1800	Generado automáticamente por Importación Masiva	a5edc1dd-9410-4a40-986b-d280e10af715
343297d6-7294-4764-861c-55eeafbf1b24	2025-12-20 19:14:10.338819+00	2025-12-20 19:14:10.338819+00	Contadora	33655640-aafb-469d-8d8d-89fd0d2d04a9	\N	2200.5	2800.5	Generado automáticamente por Importación Masiva	a5edc1dd-9410-4a40-986b-d280e10af715
c20225ff-bf43-4975-b828-f1e3e614df15	2025-12-20 19:14:12.948776+00	2025-12-20 19:14:12.948776+00	Gerente de Ventas	33655640-aafb-469d-8d8d-89fd0d2d04a9	\N	2900	3500	Generado automáticamente por Importación Masiva	a5edc1dd-9410-4a40-986b-d280e10af715
f96104d0-4871-4429-88f1-a4b4e0c98fa3	2025-12-20 19:14:15.53659+00	2025-12-20 19:14:15.53659+00	Asistente	33655640-aafb-469d-8d8d-89fd0d2d04a9	\N	500	1100	Generado automáticamente por Importación Masiva	a5edc1dd-9410-4a40-986b-d280e10af715
886b57d6-b76a-46b0-b879-f42ffd5579df	2025-12-20 19:14:17.678761+00	2025-12-20 19:14:17.678761+00	Sin Cargo Asignado	33655640-aafb-469d-8d8d-89fd0d2d04a9	\N	100	700	Generado automáticamente por Importación Masiva	a5edc1dd-9410-4a40-986b-d280e10af715
3c8f4d53-8442-40a3-b6f4-aede9e54cabe	2025-12-20 23:09:09.000123+00	2025-12-20 23:09:09.000123+00	Promotor	54e9a5b1-5f85-47b7-815c-55b8d43aa0f2	\N	500	800	\N	\N
2a256b4b-8760-4c17-bb53-15a758447d95	2025-12-20 23:33:29.871693+00	2025-12-20 23:33:29.871693+00	Analista de Datos	54e9a5b1-5f85-47b7-815c-55b8d43aa0f2	\N	800	1000	\N	\N
c7cc35a2-2536-4402-a334-e37f56729575	2025-12-21 22:33:37.555878+00	2025-12-21 22:33:37.555878+00	Prueba Puesto	54e9a5b1-5f85-47b7-815c-55b8d43aa0f2	\N	0	200	\N	\N
09ce3359-5768-48e0-906e-bb23c019d15b	2025-12-22 15:28:04.712456+00	2025-12-22 15:28:04.712456+00	 Byron Alvarez	694bc682-5f9c-4fd2-af7b-32d06808b51c	\N	1	2	\N	\N
\.


--
-- Data for Name: ciclos_evaluacion; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.ciclos_evaluacion (id, "createdAt", "updatedAt", nombre, "fechaInicio", "fechaFin", "empresaId", "deletedAt", estado) FROM stdin;
0c8bfb96-05a1-4faa-b925-4ca1232f6e31	2025-11-20 04:59:02.518356+00	2025-11-20 04:59:49.669989+00	Evaluación Anual 2025 (En Curso)	2025-01-15	2025-02-28	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	ACTIVO
\.


--
-- Data for Name: conceptos_nomina; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.conceptos_nomina (id, "createdAt", "updatedAt", "deletedAt", nombre, tipo, "esFijo", formula, "esAutomatico", "montoEstimado", "empresaId") FROM stdin;
d4a7eaaa-64ab-4aa6-a684-fb6af4c69f51	2025-12-17 16:19:21.506238+00	2025-12-17 16:19:21.506238+00	\N	Bono Navideño	Ingreso	f	\N	f	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673
dcab28c1-1d92-4f12-afad-d4820995f6ae	2025-12-17 16:20:49.733975+00	2025-12-17 16:20:49.733975+00	\N	Aporte Cena Empresa	Egreso	f	\N	f	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673
\.


--
-- Data for Name: contratos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.contratos (id, "createdAt", "updatedAt", tipo, salario, moneda, "fechaInicio", "fechaFin", estado, "empleadoId", "deletedAt") FROM stdin;
aa3fbf0e-56a4-485c-a571-441484b4425f	2025-11-08 05:57:28.62905+00	2025-11-08 05:57:28.62905+00	Indefinido	0	USD	2025-11-08	\N	Vigente	fa703991-ff73-4097-825b-19355d867255	\N
cbc1c5ec-77ba-4bb8-8fe1-7d92cd143954	2025-11-13 05:06:08.025331+00	2025-11-13 05:06:08.025331+00	Plazo Fijo	30000	USD	2024-01-01	2024-12-31	Finalizado	96c517a9-ebd5-4be6-a678-00eb00f1f2f4	\N
0387d3d9-1eb3-4597-bfbc-03f45cd3583d	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	Indefinido	0	USD	2025-11-26	\N	Vigente	20828f29-0d04-444b-b788-87f5acefc9c2	\N
1b5bd607-38b4-4b6c-ab75-be7b0573ec1b	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	Indefinido	0	USD	2025-11-27	\N	Vigente	9058a32e-6cbc-4e58-b344-bb70bfe99368	\N
cd58ea72-f617-45bf-9378-e86f2c466f2b	2025-12-09 16:48:14.818679+00	2025-12-09 16:48:56.175346+00	Indefinido	2000	USD	2025-12-09	2025-12-09	Finalizado	429736bd-bf4b-44b6-b8f2-029f27bb2b24	\N
e44c9b6b-05d7-425a-8031-feb6c4b88488	2025-12-09 17:02:48.240524+00	2025-12-09 17:03:10.740031+00	Plazo Fijo	2000	USD	2025-12-09	2025-12-09	Finalizado	50432592-194c-4707-a212-5a716cfca48e	\N
2db3a639-ddef-4821-920e-caf02750b0b2	2025-12-09 23:09:56.031942+00	2025-12-09 23:09:56.031942+00	Indefinido	1500	USD	2025-12-09	\N	Vigente	c351bc6e-bb11-4738-8fe0-db467bd6e1ce	\N
e753fc13-cf0e-44d3-92ac-4b45b460f3e6	2025-11-13 05:04:44.515372+00	2025-12-16 16:54:08.626269+00	Indefinido	50000	USD	2025-01-01	2025-12-16	Finalizado	96c517a9-ebd5-4be6-a678-00eb00f1f2f4	\N
ed89e66f-460e-4d6f-851c-b9feea699363	2025-12-19 03:31:38.724705+00	2025-12-19 03:32:47.511716+00	Indefinido	3200	USD	3200-01-01	2025-12-19	Finalizado	d4eb6ed1-60f5-4f86-a9e6-f59655e78324	\N
59ccc41d-3709-441a-ab93-f262e55054f8	2025-12-19 03:31:35.800003+00	2025-12-19 03:32:52.871548+00	Indefinido	1500	USD	1970-01-01	2025-12-19	Finalizado	b9179f69-7b28-46bb-9bbf-529603d1716f	\N
7a8d6351-e421-4c71-aef4-74deb630bf43	2025-12-19 03:31:41.002066+00	2025-12-19 03:32:55.301492+00	Indefinido	800	USD	1970-01-01	2025-12-19	Finalizado	27a394c2-17bd-4bc6-9d98-395b7bd0a980	\N
0edca061-9745-43f1-87a2-be14b5b638dc	2025-12-19 03:37:13.76628+00	2025-12-19 03:40:04.329446+00	Indefinido	3200	USD	2021-05-20	2025-12-19	Finalizado	d4eb6ed1-60f5-4f86-a9e6-f59655e78324	\N
c50ac9e4-938f-46ee-8357-6edc33f9f69a	2025-12-19 03:37:11.694574+00	2025-12-19 03:40:09.165047+00	Indefinido	2500.5	USD	2022-11-01	2025-12-19	Finalizado	50b9d742-4d39-440b-8d45-02b131527103	\N
b55a43f1-cf45-4adb-bd12-06d0efdadc85	2025-12-19 03:37:15.694595+00	2025-12-19 03:40:30.189666+00	Indefinido	800	USD	2023-08-10	2025-12-19	Finalizado	27a394c2-17bd-4bc6-9d98-395b7bd0a980	\N
10288ef9-106d-4106-a575-d35514147d08	2025-12-19 03:37:09.52033+00	2025-12-19 03:40:35.865516+00	Indefinido	1500	USD	2023-01-15	2025-12-19	Finalizado	b9179f69-7b28-46bb-9bbf-529603d1716f	\N
a221cf41-87ad-4544-97de-0d0a08fcd54d	2025-12-19 03:41:45.484983+00	2025-12-19 03:41:45.484983+00	Indefinido	1500	USD	2023-01-15	\N	Vigente	b9179f69-7b28-46bb-9bbf-529603d1716f	\N
dfefbc82-c6df-4396-8f25-68604fa40222	2025-12-19 03:41:47.233713+00	2025-12-19 03:41:47.233713+00	Indefinido	2500.5	USD	2022-11-01	\N	Vigente	50b9d742-4d39-440b-8d45-02b131527103	\N
c58ec2d9-912f-4ae8-a05e-9ae9e1e89297	2025-12-19 03:41:48.944219+00	2025-12-19 03:41:48.944219+00	Indefinido	3200	USD	2021-05-20	\N	Vigente	d4eb6ed1-60f5-4f86-a9e6-f59655e78324	\N
e8194faf-d2db-459f-bbf3-584b7a96f889	2025-12-19 03:41:50.726066+00	2025-12-19 03:41:50.726066+00	Indefinido	800	USD	2023-08-10	\N	Vigente	27a394c2-17bd-4bc6-9d98-395b7bd0a980	\N
6f5cb3b5-3ec6-4476-a00e-67df5b7b1ac7	2025-12-19 03:41:52.372435+00	2025-12-19 03:41:52.372435+00	Indefinido	400	USD	2023-09-01	\N	Vigente	a78fa518-091d-457a-9cfe-aebc8724e2bd	\N
855d1ecd-0725-41c6-85a6-10a5733a10b6	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Indefinido	0	USD	2025-12-20	\N	Vigente	67c9a831-d9fa-458a-b762-784b1bd3a3d9	\N
60cef99c-8789-4448-9477-3734cf2dbcc5	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Indefinido	0	USD	2025-12-20	\N	Vigente	e1da2a85-3966-44a5-bfa9-05a00b92cc4f	\N
e7731298-29f5-4246-bcd7-2b5539ecd9a5	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Indefinido	0	USD	2025-12-20	\N	Vigente	fd4d7d33-43a6-49e0-8213-35b8cc4710e4	\N
99d6988b-859b-4f6a-85c7-b606388ce553	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Indefinido	0	USD	2025-12-20	\N	Vigente	a18ede53-3038-49fd-9a0b-5dfc37839417	\N
ba2f818a-c11d-4937-a670-6c1ce2cc1854	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Indefinido	0	USD	2025-12-20	\N	Vigente	99538004-92d6-47e7-b600-d173ea61e3ff	\N
1ad5c8e0-0fba-44f3-a10c-afffa39e5876	2025-12-20 06:30:01.612+00	2025-12-20 06:30:01.612+00	Indefinido	0	USD	2025-12-20	\N	Vigente	635ce828-e8a4-4a75-9b6c-02dd4e91c309	\N
bc8b1259-84d1-4dbb-81f0-5f793d6adfca	2025-12-20 19:14:06.827974+00	2025-12-20 19:14:06.827974+00	Indefinido	1500	USD	2023-01-15	\N	Vigente	33679e25-e8a7-42d1-9abb-bc72637f772c	\N
dd33cc13-2a89-4770-bff2-83a9cd8bf30b	2025-12-20 19:14:10.357098+00	2025-12-20 19:14:10.357098+00	Indefinido	2500.5	USD	2022-11-01	\N	Vigente	add8ef71-6b8f-423f-95fb-eab7e29efb70	\N
9f51a600-1457-48e7-8e4c-0b5c17ebaacf	2025-12-20 19:14:12.964815+00	2025-12-20 19:14:12.964815+00	Indefinido	3200	USD	2021-05-20	\N	Vigente	90a07dc8-8feb-4582-8830-425e388d441a	\N
cb84393b-22ef-4567-9272-30568e3e3c62	2025-12-20 19:14:15.557099+00	2025-12-20 19:14:15.557099+00	Indefinido	800	USD	2023-08-10	\N	Vigente	99d62f5a-86e8-4844-9488-1da5bde6317c	\N
e893e5ee-255a-4afa-bb6d-4d1d23f70f23	2025-12-20 19:14:17.696013+00	2025-12-20 19:14:17.696013+00	Indefinido	400	USD	2023-09-01	\N	Vigente	e7dc0706-a387-4f70-a0b4-e0acb60b46f8	\N
396080b4-72b3-4699-9a82-9732c2e8246a	2025-12-22 00:26:13.309903+00	2025-12-22 00:26:13.309903+00	Indefinido	2300	USD	2025-12-21	\N	Vigente	a375538e-94fe-4d2c-9a3a-eb42a03d26f6	\N
92348ecd-f0a3-47a4-b691-1595ce4869a6	2025-12-22 15:28:52.67209+00	2025-12-22 15:28:52.67209+00	Indefinido	2	USD	2025-12-22	\N	Vigente	81b2d249-202d-4b8f-b84b-440c668ee216	\N
\.


--
-- Data for Name: cursos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.cursos (id, "createdAt", "updatedAt", "deletedAt", titulo, descripcion, duration, instructor, category, "imageUrl", "isActive", "empresaId") FROM stdin;
7803502f-ac52-4288-8bc7-118e8ea85c79	2025-12-16 16:33:09.125849+00	2025-12-16 16:33:09.125849+00	\N	VALENTINA DISEÑO	VALENTINA TE ENSEÑA A DISEÑAR	2 horas	Valentina Samaniego	Tecnología	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvPQt2VvSA3ENdFDEjWHTs2pdqZtWQyhayPQ&s	t	d845d7a9-9dcf-4db3-95f3-131b93e40673
666d8f1e-4624-41aa-8030-7e9260ef1e3d	2025-12-21 04:13:53.893931+00	2025-12-21 04:13:53.893931+00	\N	Curso Frontend	Vamos a aprender angular 20	4 horas	Gabriela Loyola	Tecnología	https://facialix.com/wp-content/uploads/2024/01/curso-frontend-certificado-gratis.jpg	t	a5edc1dd-9410-4a40-986b-d280e10af715
\.


--
-- Data for Name: departamentos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.departamentos (id, "createdAt", "updatedAt", nombre, "empresaId", "deletedAt", "sucursalId") FROM stdin;
eefa3998-7a2d-4f4d-be0f-54e8acfb8231	2025-11-08 05:57:28.62905+00	2025-11-23 01:52:44.571295+00	General	d845d7a9-9dcf-4db3-95f3-131b93e40673	2025-11-23 01:52:44.571295+00	\N
d3da9e1a-51c0-431e-9668-a4c6727e242f	2025-11-23 02:01:37.803898+00	2025-11-23 02:01:37.803898+00	Finanzas	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	\N
7ee03611-e52b-424a-bca8-345a82d368b0	2025-11-23 02:01:43.791995+00	2025-11-23 02:01:43.791995+00	Development	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	\N
f54ec2d6-22f8-4bf9-adf1-2f2df9ab6a32	2025-11-23 21:57:42.178249+00	2025-11-23 21:57:42.178249+00	Diseño	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	\N
024860da-5fec-4fd8-8e9e-0881d96c38ff	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	General	8904d395-93eb-4171-b148-fe9f10133955	\N	\N
f28d5149-727c-4c0f-aef3-6695745b7587	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	General	61e81ec9-8d21-460b-81b3-addc2df089a4	\N	\N
2bc47045-73ff-4e62-b53c-561fa26193e9	2025-11-23 02:01:32.580501+00	2025-12-16 16:41:39.603986+00	Marketin	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	\N
09cff220-ff38-4ae4-86ef-7f1d93bac88c	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	General	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	\N
afd4869b-2484-49b5-a17e-227d7ba49ccd	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	General	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	\N
5bc08bfd-ac0e-4125-a935-a4a62a52cd5b	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	General	60cdd23e-d098-4c2b-ab9c-83f1aee45642	\N	\N
d4ed7407-3dea-4c27-ab8d-20b9a3cceea9	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	General	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	\N	\N
97e69216-a0c4-4346-a7f9-1f2f96e91eca	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	General	f99851b0-65cd-48b5-88de-e95e7944a380	\N	\N
33655640-aafb-469d-8d8d-89fd0d2d04a9	2025-12-20 06:30:01.612+00	2025-12-20 06:30:01.612+00	General	a5edc1dd-9410-4a40-986b-d280e10af715	\N	\N
54e9a5b1-5f85-47b7-815c-55b8d43aa0f2	2025-12-20 23:08:49.615983+00	2025-12-20 23:08:49.615983+00	Marketing	a5edc1dd-9410-4a40-986b-d280e10af715	\N	dd146528-e6c8-4970-a572-10e7b6f94429
694bc682-5f9c-4fd2-af7b-32d06808b51c	2025-12-22 15:27:51.83584+00	2025-12-22 15:27:51.83584+00	Byron Alvarez	a5edc1dd-9410-4a40-986b-d280e10af715	\N	e305608f-24d0-46f4-892a-04dd92817db6
\.


--
-- Data for Name: documentos_empleados; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.documentos_empleados (id, "createdAt", "updatedAt", "deletedAt", nombre, tipo, url, "fechaSubida", "empleadoId") FROM stdin;
1617bf3a-a399-4747-9d1b-9e08a6659d2d	2025-11-22 21:45:32.494419+00	2025-11-22 21:45:32.494419+00	\N	Prueba2	Certificación Externa	http://localhost:3000/uploads/d845d7a9-9dcf-4db3-95f3-131b93e40673/empleados/fa703991-ff73-4097-825b-19355d867255/documentos/a394297db2b99a4575db3fec610aa1d8b.pdf	2025-11-22	fa703991-ff73-4097-825b-19355d867255
6aaa2a4b-cdf6-457d-8ca5-eb93956332ef	2025-11-22 22:15:29.012953+00	2025-11-22 22:15:29.012953+00	\N	Prueba3	Otros	http://localhost:3000/uploads/d845d7a9-9dcf-4db3-95f3-131b93e40673/empleados/fa703991-ff73-4097-825b-19355d867255/documentos/b105fb3afde331cde891851afa0a3765f.pdf	2025-11-22	fa703991-ff73-4097-825b-19355d867255
55627ca4-8823-4284-b6cb-0d09d74b9efa	2025-12-21 01:48:52.252644+00	2025-12-21 01:48:52.252644+00	\N	PRUEBA DOCUMENTO	Certificación Externa	http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/empleados/635ce828-e8a4-4a75-9b6c-02dd4e91c309/documentos/b7da1b505f24e5e87356698d7b91081f2.pdf	2025-12-21	635ce828-e8a4-4a75-9b6c-02dd4e91c309
\.


--
-- Data for Name: documentos_empresa; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.documentos_empresa (id, "createdAt", "updatedAt", "deletedAt", nombre, descripcion, url, categoria, "fechaSubida", "empresaId", "sucursalId") FROM stdin;
401fd5de-4861-4b8b-bf4e-9077b1141718	2025-12-21 01:16:18.802841+00	2025-12-21 01:16:18.802841+00	\N	EticaAplicada.pdf	Prueba	https://via.placeholder.com/pdf-mock.pdf	FORMATOS	2025-12-21	a5edc1dd-9410-4a40-986b-d280e10af715	e305608f-24d0-46f4-892a-04dd92817db6
fb25c8f6-b501-4ba7-8c21-f12ee8be07b9	2025-12-21 01:57:07.008415+00	2025-12-21 01:57:07.008415+00	\N	PRUEBA SEDE ZAMORA		http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/documentos-empresa/7bc6eb27e10a22351db1ffbd6c53d4c3.pdf	POLÍTICA	2025-12-21	a5edc1dd-9410-4a40-986b-d280e10af715	e305608f-24d0-46f4-892a-04dd92817db6
f25b0984-2e16-4399-89ed-5f20f8225664	2025-12-21 02:08:13.343814+00	2025-12-21 02:08:13.343814+00	\N	Coso Prueba EN loja		http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/documentos-empresa/e5223464b3d01bc109924e77f34cf7a1.pdf	FORMATO	2025-12-21	a5edc1dd-9410-4a40-986b-d280e10af715	dd146528-e6c8-4970-a572-10e7b6f94429
664e32d2-d1d0-4082-8684-ef67a7b4a42b	2025-12-21 04:15:04.222807+00	2025-12-21 04:15:04.222807+00	\N	Politica Interna Empresa 2026	Documento de Normativa Interna	http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/documentos-empresa/10a7d413852e7ede3fa1f1568aa30dfdc.pdf	POLÍTICA	2025-12-21	a5edc1dd-9410-4a40-986b-d280e10af715	\N
574fe906-575c-4c34-a0a1-5a2db6ea8d47	2025-12-21 04:32:07.956641+00	2025-12-21 04:32:07.956641+00	\N	Reglamento Interno Empresa	Documento de Normativa Interna	http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/documentos-empresa/83c107681f80d0f6ee961cd101a90633ae.pdf	REGLAMENTO	2025-12-21	a5edc1dd-9410-4a40-986b-d280e10af715	\N
\.


--
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.empleados (id, "createdAt", "updatedAt", nombre, apellido, "tipoIdentificacion", "nroIdentificacion", "emailPersonal", telefono, direccion, "fechaNacimiento", estado, "datosPersonalizados", "empresaId", "usuarioId", "rolId", "cargoId", "jefeId", "deletedAt", "fotoUrl", "sucursalId") FROM stdin;
cc6e191b-6566-46b7-8ed3-3ada5364414d	2025-11-15 04:59:12.532954+00	2025-11-15 04:59:12.532954+00	Gaby	Loyola	\N	\N	gaby@test.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	3420e657-2590-4b90-b767-ae21ce4376ad	\N	\N	\N	\N
6f912371-9183-4516-90b1-9d53c8a6b491	2025-11-22 06:08:15.174964+00	2025-11-22 06:08:15.174964+00	Erick	Rodas Jh	\N	\N	erickrodas559@gmail.com	0995520577	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	3420e657-2590-4b90-b767-ae21ce4376ad	\N	\N	\N	\N
c52bd81b-9341-434f-9364-6817bfc82885	2025-11-23 23:56:48.671596+00	2025-11-23 23:56:48.852416+00	Valentina	.	\N	\N	valentinasamaniego5@gmail.com	0995520577	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	f160d896-8729-47cc-a9dc-378cf088c48b	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	e22c878e-b03f-4139-adbc-9bce341e744a	\N	\N	\N	\N
7ca7fc59-9a54-4639-9693-e22e33a63244	2025-11-22 06:15:08.293896+00	2025-11-25 18:58:46.059244+00	Jhair	Ordoñez	\N	\N	ruby02591@gmail.com	0995520577	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	7a2b302d-191f-4a9a-875d-42034c723522	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	3420e657-2590-4b90-b767-ae21ce4376ad	\N	\N	http://localhost:3000/uploads/d845d7a9-9dcf-4db3-95f3-131b93e40673/empleados/7ca7fc59-9a54-4639-9693-e22e33a63244/foto/3b756b3925271a552d10fc91206a7fdad.png	\N
20828f29-0d04-444b-b788-87f5acefc9c2	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	Jeimy	Torres	\N	\N	\N	\N	\N	\N	Activo	\N	8904d395-93eb-4171-b148-fe9f10133955	9a75b06a-0b74-4592-9e82-4d85c47920cf	5e667a90-3c46-47fe-9922-b8928e59de4b	47d66cbe-c18f-46ab-9884-4a9d3dfd393e	\N	\N	\N	\N
70847fc0-7314-40d8-9b93-82763c14d4b9	2025-11-26 17:59:04.963745+00	2025-11-26 17:59:04.963745+00	Jeimy	Torres	\N	\N	jeimy1605@gmail.com	0995520577	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	e22c878e-b03f-4139-adbc-9bce341e744a	\N	\N	\N	\N
03bfc407-1509-4e5e-82e4-ca7b3e348aab	2025-11-27 18:11:22.675495+00	2025-11-27 18:11:22.757184+00	Gerente Sucursal	Lopez	\N	\N	gerente@matriz.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	f734b62b-e1af-4ab4-bad9-5eaa550f849a	9d8d7df7-ed94-4882-8936-799a2dc35a2e	e22c878e-b03f-4139-adbc-9bce341e744a	\N	\N	\N	b68f5b5c-14dc-4477-be9e-90cfe778a038
9058a32e-6cbc-4e58-b344-bb70bfe99368	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	Jeimy	Torres	\N	\N	\N	\N	\N	\N	Activo	\N	61e81ec9-8d21-460b-81b3-addc2df089a4	b315bcdc-323a-44d1-b8af-7a148b9228f2	5f79c09d-474f-481f-a177-97755549b116	8e9af25c-a6ff-4e22-85b6-8932d8f47502	\N	\N	\N	\N
6e5320ef-a4c1-48e0-be65-13c1d0ef31bd	2025-11-26 18:17:12.320459+00	2025-11-28 01:45:31.78368+00	Wilson	Lozano	\N	\N	weimsisas@gmail.com	0995520555	\N	\N	Inactivo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	63655701-8952-4e7b-8fc5-0c2106dac2a4	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	e22c878e-b03f-4139-adbc-9bce341e744a	\N	\N	\N	\N
429736bd-bf4b-44b6-b8f2-029f27bb2b24	2025-12-09 16:48:14.776958+00	2025-12-09 16:48:56.183975+00	Byron	Alvarez	\N	\N	jeimy1605@gmail.com	0995520577	\N	\N	Inactivo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	9a75b06a-0b74-4592-9e82-4d85c47920cf	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	31cd3ee8-eab6-4c25-97ac-4f7fea9fb029	\N	\N	\N	\N
50432592-194c-4707-a212-5a716cfca48e	2025-12-09 17:02:48.208849+00	2025-12-09 17:03:10.748039+00	EsoTilin	.	\N	\N	jeimy1605@gmai.com	0995520577	\N	\N	Inactivo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	7cc24c3c-3393-417f-94d2-36dd2d318dc3	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	31cd3ee8-eab6-4c25-97ac-4f7fea9fb029	\N	\N	\N	\N
c351bc6e-bb11-4738-8fe0-db467bd6e1ce	2025-11-27 20:13:33.018732+00	2025-12-09 23:09:56.086264+00	Wilson	Lozano	\N	\N	jeyxnwn@gmail.com	0995520577	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	b315bcdc-323a-44d1-b8af-7a148b9228f2	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	e22c878e-b03f-4139-adbc-9bce341e744a	\N	\N	\N	\N
96c517a9-ebd5-4be6-a678-00eb00f1f2f4	2025-11-13 05:03:27.236121+00	2025-12-16 16:54:08.635768+00	Byron	Alvarez	\N	\N	contratos@test.com	\N	\N	\N	Inactivo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	63b5fcb2-2fd6-4454-bf05-0f75a13a1227	3420e657-2590-4b90-b767-ae21ce4376ad	\N	\N	\N	\N
a78fa518-091d-457a-9cfe-aebc8724e2bd	2025-12-19 03:37:17.485538+00	2025-12-19 03:41:52.446779+00	Luis	Torres	CEDULA	1109876543	luis.torres@empresa.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	919d3d87-42da-4bc0-9234-740233573029	9b0fa648-2d0f-4531-8f8d-7e3a826961c7	6791436f-bee5-461b-b827-cbae46517240	\N	\N	\N	\N
fa703991-ff73-4097-825b-19355d867255	2025-11-08 05:57:28.62905+00	2025-12-19 06:52:23.51951+00	Juan	Pérez	\N	\N	\N	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	07ef5af6-1fba-4618-b461-22ccdc263c2b	9d8d7df7-ed94-4882-8936-799a2dc35a2e	3420e657-2590-4b90-b767-ae21ce4376ad	\N	\N	http://localhost:3000/uploads/d845d7a9-9dcf-4db3-95f3-131b93e40673/empleados/fa703991-ff73-4097-825b-19355d867255/foto/9ff938d3c862d181c4c94663e11950e3.png	\N
b9179f69-7b28-46bb-9bbf-529603d1716f	2025-12-19 03:31:35.792133+00	2025-12-19 03:41:45.519569+00	Juan Carlos	Pérez	CEDULA	1104567890	juan.perez@empresa.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	f35ee9d2-9fbd-4b57-8bdf-b9580f1208be	9b0fa648-2d0f-4531-8f8d-7e3a826961c7	42f62faa-1138-4a89-aa8a-bb6cc20f1dd2	\N	\N	\N	\N
50b9d742-4d39-440b-8d45-02b131527103	2025-12-19 03:31:38.295229+00	2025-12-19 03:41:47.241592+00	María	Gómez	CEDULA	0912345678	maria.gomez@empresa.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	2aa19fb4-c140-4698-adc0-9b0515c12154	9b0fa648-2d0f-4531-8f8d-7e3a826961c7	c1ce3c64-8ce5-4c58-aa6f-ff1b6193002a	\N	\N	\N	\N
d4eb6ed1-60f5-4f86-a9e6-f59655e78324	2025-12-19 03:31:38.719945+00	2025-12-19 03:41:48.953824+00	Pedro	Ramírez	CEDULA	1712345678	pedro.ramirez@empresa.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	bd8480a4-8b69-47f2-a5fd-ef461b1830a7	9b0fa648-2d0f-4531-8f8d-7e3a826961c7	b412ab68-c302-4088-aa06-03a371a2eeaa	\N	\N	\N	\N
27a394c2-17bd-4bc6-9d98-395b7bd0a980	2025-12-19 03:31:40.997722+00	2025-12-19 03:41:50.736367+00	Ana	López	CEDULA	0102030405	ana.lopez@empresa.com	\N	\N	\N	Activo	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	539a0df3-e1e0-4abc-87c5-2024b7ab76d3	9b0fa648-2d0f-4531-8f8d-7e3a826961c7	d9367fa0-1102-465b-bb01-20b5b5eb3dcc	\N	\N	\N	\N
67c9a831-d9fa-458a-b762-784b1bd3a3d9	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Usuario	Actual	\N	\N	\N	\N	\N	\N	Activo	\N	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	4d5745af-8a8f-4baf-85bb-6a848c9f68de	90c299da-fd74-494e-9772-241c22ee039c	\N	\N	\N	\N
e1da2a85-3966-44a5-bfa9-05a00b92cc4f	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Usuario	Actual	\N	\N	\N	\N	\N	\N	Activo	\N	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	e1f1ae8a-68ff-4af3-a619-248f5ace8087	236e81ac-094f-4ca6-b9a7-3de7c7a57f82	\N	\N	\N	\N
fd4d7d33-43a6-49e0-8213-35b8cc4710e4	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Usuario	Actual	\N	\N	\N	\N	\N	\N	Activo	\N	60cdd23e-d098-4c2b-ab9c-83f1aee45642	07ef5af6-1fba-4618-b461-22ccdc263c2b	bc88625b-ba71-4364-9e6e-38c68b38cc29	bc0905e3-1a71-4bda-b0d4-945fd1d14045	\N	\N	\N	\N
a18ede53-3038-49fd-9a0b-5dfc37839417	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Usuario	Actual	\N	\N	\N	\N	\N	\N	Activo	\N	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	07ef5af6-1fba-4618-b461-22ccdc263c2b	f8f291c4-4fb3-47b5-a6db-e07d213a46e7	1315832e-f24d-449e-8b33-df2dfeb900e2	\N	\N	\N	\N
99538004-92d6-47e7-b600-d173ea61e3ff	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Usuario	Actual	\N	\N	\N	\N	\N	\N	Activo	\N	f99851b0-65cd-48b5-88de-e95e7944a380	07ef5af6-1fba-4618-b461-22ccdc263c2b	a24a1b78-2b2a-46fa-bf87-963b07d0e4e6	a390fd2f-fdb5-4d54-b396-3dffd82198ec	\N	\N	\N	\N
90a07dc8-8feb-4582-8830-425e388d441a	2025-12-20 19:14:12.957681+00	2025-12-21 21:20:30.56294+00	Pedro	Yepez	CEDULA	1712345678	pedro.ramirez@empresa.com	\N	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	bd8480a4-8b69-47f2-a5fd-ef461b1830a7	8e61e6b1-34f1-4dfe-96a1-2b34bd0309e4	c20225ff-bf43-4975-b828-f1e3e614df15	635ce828-e8a4-4a75-9b6c-02dd4e91c309	\N	\N	e305608f-24d0-46f4-892a-04dd92817db6
81b2d249-202d-4b8f-b84b-440c668ee216	2025-12-22 15:28:52.659385+00	2025-12-23 19:02:16.159904+00	Byron	Alvarez	Cedula	1111111111	bvalvarez1.1@gmail.com	234234232	\N	\N	De Vacaciones	\N	a5edc1dd-9410-4a40-986b-d280e10af715	d94163f7-0c0e-44f4-a507-385eb0b71c31	2525fb5e-2942-4ff4-913f-1243afd4f6ec	09ce3359-5768-48e0-906e-bb23c019d15b	90a07dc8-8feb-4582-8830-425e388d441a	\N	\N	e305608f-24d0-46f4-892a-04dd92817db6
635ce828-e8a4-4a75-9b6c-02dd4e91c309	2025-12-20 06:30:01.612+00	2025-12-21 04:49:04.19209+00	Erick	Rodas	\N	\N	ruby02591@gmail.com	\N	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	7a2b302d-191f-4a9a-875d-42034c723522	b74f3f4d-3422-4ffa-a816-343f8d4b556d	53d2d98d-210e-4a4e-8205-35a0853fe8df	\N	\N	http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/empleados/635ce828-e8a4-4a75-9b6c-02dd4e91c309/foto/6f9e6e58b701c20807abe6e107db92281.png	\N
e7dc0706-a387-4f70-a0b4-e0acb60b46f8	2025-12-20 19:14:17.69002+00	2025-12-21 21:17:55.842085+00	Luis	Torres	CEDULA	1109876543	luis.torres@empresa.com	\N	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	919d3d87-42da-4bc0-9234-740233573029	2525fb5e-2942-4ff4-913f-1243afd4f6ec	886b57d6-b76a-46b0-b879-f42ffd5579df	90a07dc8-8feb-4582-8830-425e388d441a	\N	\N	e305608f-24d0-46f4-892a-04dd92817db6
99d62f5a-86e8-4844-9488-1da5bde6317c	2025-12-20 19:14:15.552936+00	2025-12-21 21:21:14.722837+00	Ana	López	CEDULA	0102030405	ana.lopez@empresa.com	\N	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	539a0df3-e1e0-4abc-87c5-2024b7ab76d3	8e61e6b1-34f1-4dfe-96a1-2b34bd0309e4	f96104d0-4871-4429-88f1-a4b4e0c98fa3	635ce828-e8a4-4a75-9b6c-02dd4e91c309	\N	\N	dd146528-e6c8-4970-a572-10e7b6f94429
add8ef71-6b8f-423f-95fb-eab7e29efb70	2025-12-20 19:14:10.352813+00	2025-12-21 21:21:31.894047+00	María	Gómez	CEDULA	0912345678	maria.gomez@empresa.com	\N	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	2aa19fb4-c140-4698-adc0-9b0515c12154	2525fb5e-2942-4ff4-913f-1243afd4f6ec	343297d6-7294-4764-861c-55eeafbf1b24	99d62f5a-86e8-4844-9488-1da5bde6317c	\N	\N	dd146528-e6c8-4970-a572-10e7b6f94429
33679e25-e8a7-42d1-9abb-bc72637f772c	2025-12-20 19:14:06.812807+00	2025-12-21 21:22:21.209952+00	Juan Carlos	Pérez	CEDULA	1104567890	juan.perez@empresa.com	\N	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	f35ee9d2-9fbd-4b57-8bdf-b9580f1208be	57a26648-434e-463a-98c5-2d1e776aad99	7a58b83c-9826-4009-b18e-1f8901aab279	635ce828-e8a4-4a75-9b6c-02dd4e91c309	\N	\N	\N
a375538e-94fe-4d2c-9a3a-eb42a03d26f6	2025-12-22 00:26:13.287644+00	2025-12-23 04:47:01.907592+00	Jeimy	Torres	Cedula	1900897917	jeyxnwn@gmail.com	0995520577	\N	\N	Activo	\N	a5edc1dd-9410-4a40-986b-d280e10af715	b315bcdc-323a-44d1-b8af-7a148b9228f2	2525fb5e-2942-4ff4-913f-1243afd4f6ec	343297d6-7294-4764-861c-55eeafbf1b24	99d62f5a-86e8-4844-9488-1da5bde6317c	\N	http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/empleados/a375538e-94fe-4d2c-9a3a-eb42a03d26f6/foto/2b2f82ae29b8addaad5baca2c4201727.png	dd146528-e6c8-4970-a572-10e7b6f94429
\.


--
-- Data for Name: empresas; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.empresas (id, "createdAt", "updatedAt", nombre, "planSuscripcion", branding, "deletedAt", configuracion) FROM stdin;
8904d395-93eb-4171-b148-fe9f10133955	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	Empresa Jeis	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/2b51e5f26f98e22cbf10152184910ca21f.png", "primaryColor": "#E74C3C"}	\N	\N
61e81ec9-8d21-460b-81b3-addc2df089a4	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	Empresa Prueba 2	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/27979cc7b87e75b25e473c2ca4f35737.png", "primaryColor": "#9B59B6"}	\N	\N
d845d7a9-9dcf-4db3-95f3-131b93e40673	2025-11-08 05:57:28.62905+00	2025-12-10 05:36:22.584357+00	Mi Empresa S.A.	basic	\N	\N	{"nomina": {"frecuenciaPago": "mensual", "multiplicadorHorasExtra": 1.5}}
67f7cfd0-9099-44f2-9a28-3609cb8ef272	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	EmpresaPruebaRoles	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/5dd7e6b6d311c46d0639c66651d28645.png", "primaryColor": "#F39C12"}	\N	\N
24dce8fe-3132-463d-917c-c19fe787b8c6	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	PruebaRoles	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/6b121bb823c357dd10159441de41092db6.png", "primaryColor": "#F39C12"}	\N	\N
60cdd23e-d098-4c2b-ab9c-83f1aee45642	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Empresa Prueba 3 Roles	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/210224192451045b510d6b2d40810eb598c6.png", "primaryColor": "#34495E"}	\N	\N
036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	OlaEstaPrueba	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/a104c193927d10e8d4535f4f875974136.png", "primaryColor": "#F39C12"}	\N	\N
f99851b0-65cd-48b5-88de-e95e7944a380	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	AAAAAAAAAAA	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/f14acddc2e21dc8bfa82aeb8515a804c.png", "primaryColor": "#9B59B6"}	\N	\N
a5edc1dd-9410-4a40-986b-d280e10af715	2025-12-20 06:30:01.612+00	2025-12-25 01:52:31.931223+00	EMPRESA PRUEBA DIOS	basic	{"logoUrl": "http://localhost:3000/uploads/public/temp/logos/910752e7f1ddcb8a42d8e1fd6313108a65.png", "primaryColor": "#4c7401"}	\N	\N
\.


--
-- Data for Name: encuesta_opciones; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.encuesta_opciones (id, "createdAt", "updatedAt", "deletedAt", texto, votos, "encuestaId") FROM stdin;
7e69b1fc-71cb-4dbb-98fe-81e3875026d5	2025-12-23 04:45:39.309353+00	2025-12-23 04:45:39.309353+00	\N	Si	0	6e36bc09-7fa4-4827-8c4b-8f27c0919fd6
5551c9f3-b053-4a30-a2b8-951c88e910ce	2025-12-23 04:45:39.309353+00	2025-12-23 04:45:39.309353+00	\N	Tambien	0	6e36bc09-7fa4-4827-8c4b-8f27c0919fd6
faa5740d-ee8f-4838-8a47-0459126ea813	2025-12-23 04:46:08.620655+00	2025-12-23 04:46:08.620655+00	\N	Tampoco	0	bc346ec7-bada-406f-96d6-ad287847d407
bf4ed477-17b8-4801-a322-9dddbe0ba955	2025-12-23 04:58:36.806316+00	2025-12-23 04:58:36.806316+00	\N	a	0	048d1c89-fb00-458f-a958-42a0d15677f1
dfd29608-cbe5-4615-b4e0-6b35b35294f6	2025-12-23 05:02:06.133325+00	2025-12-23 05:02:06.133325+00	\N	ASDASD	0	950dff22-6655-48a7-a8af-d90061e3b7f2
ddc9d819-7389-4c00-b0c4-4bba92e10145	2025-12-23 05:11:06.638275+00	2025-12-23 05:11:06.638275+00	\N	a	0	fde4e6ef-3352-4929-a8aa-fd216de48786
c1c7bea8-8a41-4baf-a020-b9d9290d1359	2025-12-23 05:14:11.510219+00	2025-12-23 05:14:11.510219+00	\N	2	0	ce9e760c-e235-4a19-8e6f-f26b76c574c3
04867b6d-8871-4fbf-b398-b94d1a108946	2025-12-23 05:20:00.594609+00	2025-12-23 05:20:00.594609+00	\N	2	0	bc55881c-28a3-4af6-8508-bf324f171624
3346b4a0-4f7e-41e5-8ed6-95cd97003738	2025-12-23 05:34:58.61546+00	2025-12-23 05:34:58.61546+00	\N	b	0	98c30b93-c89f-4f13-ba31-d1d45a22ea34
6ece9b01-1538-41c6-be0c-7b97788ead9f	2025-12-23 05:39:35.325773+00	2025-12-23 05:39:35.325773+00	\N	1	0	c2429d4d-9510-431c-85ac-583f511184f9
8c7fe69c-71fa-4fdd-a8d8-beaf58d16dd1	2025-12-23 05:39:35.325773+00	2025-12-23 15:06:10.737174+00	\N	2	1	c2429d4d-9510-431c-85ac-583f511184f9
dc9fc2d7-2cda-439e-a3a9-439172b6ce97	2025-12-23 05:34:58.61546+00	2025-12-23 15:10:47.198172+00	\N	a	1	98c30b93-c89f-4f13-ba31-d1d45a22ea34
002cd226-6f75-4397-8269-e27a4c3ffb8c	2025-12-23 05:20:00.594609+00	2025-12-23 15:11:00.613066+00	\N	1	1	bc55881c-28a3-4af6-8508-bf324f171624
736c02a6-25ff-4679-97c6-5ce635053d85	2025-12-23 05:14:11.510219+00	2025-12-23 15:11:10.139601+00	\N	1	1	ce9e760c-e235-4a19-8e6f-f26b76c574c3
15a63baf-3848-45d6-b559-1193e4925ed1	2025-12-23 05:11:06.638275+00	2025-12-23 15:11:29.582135+00	\N	b	1	fde4e6ef-3352-4929-a8aa-fd216de48786
e52b394e-17f9-4009-9c15-e916df5be29b	2025-12-23 05:02:06.133325+00	2025-12-23 15:11:37.651957+00	\N	SDASDA	1	950dff22-6655-48a7-a8af-d90061e3b7f2
fa8e3200-0357-4683-9f8b-a228dec2360d	2025-12-23 04:58:36.806316+00	2025-12-23 15:11:41.51817+00	\N	b	1	048d1c89-fb00-458f-a958-42a0d15677f1
fcc79715-b272-4f40-800c-33d745f35a32	2025-12-23 04:46:08.620655+00	2025-12-23 15:11:47.746853+00	\N	No	1	bc346ec7-bada-406f-96d6-ad287847d407
\.


--
-- Data for Name: encuestas; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.encuestas (id, "createdAt", "updatedAt", "deletedAt", titulo, descripcion, "fechaFin", "esAnonima", activa, "empresaId", "sucursalId") FROM stdin;
6e36bc09-7fa4-4827-8c4b-8f27c0919fd6	2025-12-23 04:45:39.309353+00	2025-12-23 04:45:39.309353+00	\N	Encuesta Global Prueba	Probando	2025-12-23 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
bc346ec7-bada-406f-96d6-ad287847d407	2025-12-23 04:46:08.620655+00	2025-12-23 04:46:08.620655+00	\N	Esta si es la global la otra era de zamora	Esta si es la global	2025-12-26 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
048d1c89-fb00-458f-a958-42a0d15677f1	2025-12-23 04:58:36.806316+00	2025-12-23 04:58:36.806316+00	\N	New Encuesta Zamora	AAAAAAAAAAAAAAAAAAA	2025-12-27 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
950dff22-6655-48a7-a8af-d90061e3b7f2	2025-12-23 05:02:06.133325+00	2025-12-23 05:02:06.133325+00	\N	ENCUESTA POR 2VA VEZ ZAMORA	AAAAAAAAA	2025-12-26 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
fde4e6ef-3352-4929-a8aa-fd216de48786	2025-12-23 05:11:06.638275+00	2025-12-23 05:11:06.638275+00	\N	ESTA SI ES LA BUENA SI DIOS QUIERE	ZAMORA	2025-12-26 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
ce9e760c-e235-4a19-8e6f-f26b76c574c3	2025-12-23 05:14:11.510219+00	2025-12-23 05:14:11.510219+00	\N	SI DIOS QUIERE ESTA SI ES LA BUENA	AAAA	2025-12-25 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
bc55881c-28a3-4af6-8508-bf324f171624	2025-12-23 05:20:00.594609+00	2025-12-23 05:20:00.594609+00	\N	voy a llorar	aasadasdsa	2025-12-25 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
98c30b93-c89f-4f13-ba31-d1d45a22ea34	2025-12-23 05:34:58.61546+00	2025-12-23 05:34:58.61546+00	\N	dios mio	asdasda	2025-12-26 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
c2429d4d-9510-431c-85ac-583f511184f9	2025-12-23 05:39:35.325773+00	2025-12-23 05:39:35.325773+00	\N	la 9na es la vencida	9na encuesta	2025-12-25 05:00:00	f	t	a5edc1dd-9410-4a40-986b-d280e10af715	\N
\.


--
-- Data for Name: evaluaciones; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.evaluaciones (id, "createdAt", "updatedAt", "calificacionPotencial", "calificacionDesempeno", feedback, "cicloId", "evaluadoId", "evaluadorId", "deletedAt") FROM stdin;
5077fbcb-9b95-402e-b3f2-e06a9e91855b	2025-11-20 14:17:26.951387+00	2025-11-20 14:18:39.855788+00	8	9	Corrección: Ha demostrado gran liderazgo en el último sprint.	0c8bfb96-05a1-4faa-b925-4ca1232f6e31	cc6e191b-6566-46b7-8ed3-3ada5364414d	fa703991-ff73-4097-825b-19355d867255	\N
\.


--
-- Data for Name: inscripciones_cursos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.inscripciones_cursos (id, "createdAt", "updatedAt", "deletedAt", estado, progreso, calificacion, "fechaInscripcion", "fechaCompletado", "cursoId", "empleadoId") FROM stdin;
e824383a-a758-446b-8162-dfb18d9e0bad	2025-12-16 16:39:58.827514+00	2025-12-16 16:39:58.827514+00	\N	Inscrito	0	\N	2025-12-16 16:39:58.827514	\N	7803502f-ac52-4288-8bc7-118e8ea85c79	fa703991-ff73-4097-825b-19355d867255
52ad1ba3-bdb6-4569-a418-237187ea7e44	2025-12-20 06:15:56.568951+00	2025-12-20 06:15:56.568951+00	\N	Inscrito	0	\N	2025-12-20 06:15:56.568951	\N	7803502f-ac52-4288-8bc7-118e8ea85c79	7ca7fc59-9a54-4639-9693-e22e33a63244
8819353e-fe06-4915-8ad5-a094a3af61b9	2025-12-21 04:13:58.855933+00	2025-12-21 04:13:58.855933+00	\N	Inscrito	0	\N	2025-12-21 04:13:58.855933	\N	666d8f1e-4624-41aa-8030-7e9260ef1e3d	635ce828-e8a4-4a75-9b6c-02dd4e91c309
b82d8864-c626-47de-9fe7-79eae6806229	2025-12-22 00:28:01.21342+00	2025-12-22 00:28:01.21342+00	\N	Inscrito	0	\N	2025-12-22 00:28:01.21342	\N	666d8f1e-4624-41aa-8030-7e9260ef1e3d	a375538e-94fe-4d2c-9a3a-eb42a03d26f6
\.


--
-- Data for Name: items_gasto; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.items_gasto (id, "createdAt", "updatedAt", "deletedAt", concepto, categoria, monto, fecha, "facturaUrl", "reporteId") FROM stdin;
ace8471b-3f9c-4396-b0ce-44a79d2f8c5c	2025-12-24 06:37:28.39071+00	2025-12-24 06:37:28.39071+00	\N	Taxi	Transporte	15	2025-12-24	http://localhost:3000/uploads/a5edc1dd-9410-4a40-986b-d280e10af715/gastos-facturas/3de38159215c392db4766c158104da846.pdf	69a2924e-9f0a-42f1-843c-be9e68fa41f7
\.


--
-- Data for Name: nominas_empleados; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.nominas_empleados (id, "createdAt", "updatedAt", "totalIngresos", "totalEgresos", "netoAPagar", "periodoId", "empleadoId", "deletedAt") FROM stdin;
89a01eaa-f8c8-4e04-9495-c7eed96d85fa	2025-11-15 16:03:20.49983+00	2025-11-15 16:03:20.49983+00	0	0	0	8ea9d2d2-3b09-4e0b-9613-d57644c16d0a	fa703991-ff73-4097-825b-19355d867255	\N
22b365b8-155c-4be0-8867-e21dd11e6ef3	2025-11-15 16:03:20.49983+00	2025-11-15 16:03:20.49983+00	0	4725	-4725	8ea9d2d2-3b09-4e0b-9613-d57644c16d0a	96c517a9-ebd5-4be6-a678-00eb00f1f2f4	\N
ce8420a8-244c-43a1-ab58-4ef3f070ab27	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	0	0	0	ccf3c332-a2dd-44e1-abc5-a2e2d0e80147	fa703991-ff73-4097-825b-19355d867255	\N
383cac55-b981-4fb3-bad4-4edcfc692f4b	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	50000	5500	44500	ccf3c332-a2dd-44e1-abc5-a2e2d0e80147	96c517a9-ebd5-4be6-a678-00eb00f1f2f4	\N
a36773d1-6eca-4e4c-8767-7f058562e0b7	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	1500	165	1335	ccf3c332-a2dd-44e1-abc5-a2e2d0e80147	c351bc6e-bb11-4738-8fe0-db467bd6e1ce	\N
99f988fd-fab5-447e-9ef3-e14dc70bba49	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	0	0	0	945f59e8-3c49-4353-a64e-98601f8bf3c9	635ce828-e8a4-4a75-9b6c-02dd4e91c309	\N
7a516a7d-e106-47e6-afe3-24b766caa219	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	1500	0	1500	945f59e8-3c49-4353-a64e-98601f8bf3c9	33679e25-e8a7-42d1-9abb-bc72637f772c	\N
005373e0-75b4-4381-9ede-a0e7e3a95f71	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	2500.5	0	2500.5	945f59e8-3c49-4353-a64e-98601f8bf3c9	add8ef71-6b8f-423f-95fb-eab7e29efb70	\N
925ef08c-07e8-45da-80f9-ee415b7707f8	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	3200	0	3200	945f59e8-3c49-4353-a64e-98601f8bf3c9	90a07dc8-8feb-4582-8830-425e388d441a	\N
c6afbc67-3efc-4681-bff0-dbb2e96786f0	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	800	0	800	945f59e8-3c49-4353-a64e-98601f8bf3c9	99d62f5a-86e8-4844-9488-1da5bde6317c	\N
0e5a626d-3df1-457c-bde5-73df0316403d	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	400	0	400	945f59e8-3c49-4353-a64e-98601f8bf3c9	e7dc0706-a387-4f70-a0b4-e0acb60b46f8	\N
fe734dfb-62c7-43fb-b6f7-f243c41a76ca	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	2300	0	2300	945f59e8-3c49-4353-a64e-98601f8bf3c9	a375538e-94fe-4d2c-9a3a-eb42a03d26f6	\N
be25811d-3a43-4690-8e78-862c575b0dc4	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	2	0	2	945f59e8-3c49-4353-a64e-98601f8bf3c9	81b2d249-202d-4b8f-b84b-440c668ee216	\N
\.


--
-- Data for Name: novedades_nomina; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.novedades_nomina (id, "createdAt", "updatedAt", "deletedAt", valor, fecha, observacion, estado, "empleadoId", "conceptoId", "empresaId") FROM stdin;
\.


--
-- Data for Name: objetivos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.objetivos (id, "createdAt", "updatedAt", descripcion, progreso, "cicloId", "empleadoId", "deletedAt", tipo, "departamentoId", "parentObjetivoId") FROM stdin;
311aff0d-d66b-412b-ba2f-8cdc212c3693	2025-11-20 05:12:03.69171+00	2025-11-20 05:13:04.754769+00	Aumentar satisfacción del cliente (Encuesta enviada)	50	0c8bfb96-05a1-4faa-b925-4ca1232f6e31	cc6e191b-6566-46b7-8ed3-3ada5364414d	\N	PERSONAL	\N	\N
7991b6c0-d01f-48ac-b5ac-d9bb5a64d3dd	2025-11-27 02:57:52.42076+00	2025-11-27 04:15:05.478269+00	Aumentar Tareas	80	0c8bfb96-05a1-4faa-b925-4ca1232f6e31	7ca7fc59-9a54-4639-9693-e22e33a63244	\N	PERSONAL	\N	\N
30241ad0-22fe-49dd-a4fb-3dfe2bab7a97	2025-11-28 06:44:28.39406+00	2025-11-28 06:44:28.39406+00	Programar Coso	0	0c8bfb96-05a1-4faa-b925-4ca1232f6e31	6f912371-9183-4516-90b1-9d53c8a6b491	\N	PERSONAL	\N	\N
a266e15a-e96d-463a-a026-ace80b96bc22	2025-11-28 06:44:40.294731+00	2025-11-28 14:29:04.763828+00	Aumentar Ventas	20	0c8bfb96-05a1-4faa-b925-4ca1232f6e31	\N	\N	DEPARTAMENTO	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N
\.


--
-- Data for Name: periodos_nomina; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.periodos_nomina (id, "createdAt", "updatedAt", "fechaInicio", "fechaFin", estado, "empresaId", "deletedAt") FROM stdin;
dcf10b53-3ac1-4778-8d78-e21712290c5c	2025-11-13 16:20:35.978576+00	2025-11-13 16:25:00.067557+00	2025-11-16	2025-11-30	Cerrado	d845d7a9-9dcf-4db3-95f3-131b93e40673	2025-11-13 16:25:00.067557+00
8ea9d2d2-3b09-4e0b-9613-d57644c16d0a	2025-11-13 16:19:33.33187+00	2025-11-15 16:03:20.49983+00	2025-11-01	2025-11-15	Procesado	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N
ccf3c332-a2dd-44e1-abc5-a2e2d0e80147	2025-12-10 05:24:40.016557+00	2025-12-10 20:59:46.25652+00	2025-12-10	2025-12-10	Procesado	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N
945f59e8-3c49-4353-a64e-98601f8bf3c9	2025-12-25 02:04:45.384132+00	2025-12-25 02:04:56.928466+00	2025-12-01	2025-12-31	Procesado	a5edc1dd-9410-4a40-986b-d280e10af715	\N
\.


--
-- Data for Name: plantillas_onboarding; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.plantillas_onboarding (id, "createdAt", "updatedAt", "deletedAt", nombre, "empresaId") FROM stdin;
55beadfd-eb8c-4a42-8c32-50aecd5dfb91	2025-12-19 06:40:41.147334+00	2025-12-19 06:40:41.147334+00	\N	Onboarding General	d845d7a9-9dcf-4db3-95f3-131b93e40673
\.


--
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.proyectos (id, "createdAt", "updatedAt", nombre, descripcion, "empresaId", "deletedAt", estado, "liderId", "sucursalId") FROM stdin;
ec3f09f8-75b1-42f8-9038-ccac65795ce7	2025-11-16 22:18:18.387481+00	2025-11-18 15:18:29.702785+00	Proyecto Alfa (Actualizado)	Descripción detallada del proyecto Alfa.	d845d7a9-9dcf-4db3-95f3-131b93e40673	2025-11-18 15:18:29.702785+00	Activo	cc6e191b-6566-46b7-8ed3-3ada5364414d	\N
24ffc3f6-dd3a-4e17-8f3d-f5af06767827	2025-11-18 15:39:02.950407+00	2025-11-18 15:39:02.950407+00	Proyecto Alfa (Completo)	Descripción detallada del proyecto Alfa.	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	Activo	cc6e191b-6566-46b7-8ed3-3ada5364414d	\N
722e44ce-7fd5-49a4-8b16-60eeaeddfbda	2025-11-24 01:15:10.242088+00	2025-11-24 01:15:10.242088+00	Rediseño Web	Proyecto generado automáticamente	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	ACTIVO	\N	\N
313e8be3-7666-4931-9d84-cc02ad59adcb	2025-11-24 01:15:10.242088+00	2025-11-24 01:15:10.242088+00	Migración Nube	Proyecto generado automáticamente	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	ACTIVO	\N	\N
1a38cd53-3680-4cf2-8d04-b2b832ae1ea5	2025-11-24 01:15:10.242088+00	2025-11-24 01:15:10.242088+00	Campaña Q4	Proyecto generado automáticamente	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	ACTIVO	\N	\N
e8175d5e-aed9-4e5a-b02a-a93642d7d10d	2025-11-24 01:15:10.242088+00	2025-11-24 01:15:10.242088+00	App Móvil	Proyecto generado automáticamente	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	ACTIVO	\N	\N
20d3d556-ad8a-464e-a5fe-aa43b3833584	2025-11-24 01:15:10.242088+00	2025-11-24 01:15:10.242088+00	Auditoría	Proyecto generado automáticamente	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	ACTIVO	\N	\N
ba26c0b6-dda7-4a91-9091-6e837674fecf	2025-11-24 04:51:26.331654+00	2025-11-24 04:51:26.331654+00	App Móvil v2	Desarrollo de nueva versión mobile	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	Activo	\N	\N
98378183-ce29-41c1-b1d6-00da41b4166b	2025-11-24 04:51:26.379385+00	2025-11-24 04:51:26.379385+00	Rediseño Web Corporativa	Actualización del sitio web principal	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	Activo	\N	\N
07ddbc30-06c4-459c-8e08-9f1518cf264b	2025-11-24 04:51:26.385128+00	2025-11-24 04:51:26.385128+00	Migración a Nube	Migración de infraestructura a AWS	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	Activo	\N	\N
3428358d-5c37-4766-a101-7723f36f999e	2025-12-05 15:29:41.399647+00	2025-12-05 15:29:41.399647+00	Proyecto Prueba 2	Prueba de Proyecto 	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	Activo	7ca7fc59-9a54-4639-9693-e22e33a63244	\N
fa092a0f-91f5-4b48-aefa-9f1a00b6a68d	2025-12-20 21:52:26.645099+00	2025-12-20 21:52:26.645099+00	App Movil 2	Prueba aaaaa	a5edc1dd-9410-4a40-986b-d280e10af715	\N	Activo	90a07dc8-8feb-4582-8830-425e388d441a	e305608f-24d0-46f4-892a-04dd92817db6
\.


--
-- Data for Name: registros_asistencia; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.registros_asistencia (id, "createdAt", "updatedAt", "empleadoId", "deletedAt", fecha, "horaEntrada", "horaSalida", "totalHoras", estado, observaciones) FROM stdin;
e01e5681-7df2-42f7-8676-145b1818b2f1	2025-11-20 16:15:33.066241+00	2025-11-20 16:16:18.716971+00	cc6e191b-6566-46b7-8ed3-3ada5364414d	\N	2025-11-20	2025-11-20 16:15:33.061	2025-11-20 16:16:18.71	0.01	CERRADO	Entrada puntual. | Salida: Fin de la jornada.
\.


--
-- Data for Name: reportes_gasto; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.reportes_gasto (id, "createdAt", "updatedAt", "deletedAt", titulo, descripcion, estado, total, "fechaReporte", "empleadoId") FROM stdin;
69a2924e-9f0a-42f1-843c-be9e68fa41f7	2025-12-24 06:21:06.03578+00	2025-12-24 06:39:07.245107+00	\N	Reporte d prueba	asdas probandooo	APROBADO	15	2025-12-24	a375538e-94fe-4d2c-9a3a-eb42a03d26f6
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.roles (id, "createdAt", "updatedAt", nombre, permisos, "empresaId", "deletedAt", "esDefecto", descripcion) FROM stdin;
bc88625b-ba71-4364-9e6e-38c68b38cc29	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Super Admin	["*"]	60cdd23e-d098-4c2b-ab9c-83f1aee45642	\N	f	\N
96839e33-8025-40a5-9764-34b830b5125f	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Gerente de RRHH	["empleados.leer_basico", "empleados.leer_sensible", "empleados.gestion", "empleados.editar", "empleados.borrar", "empleados.exportar", "salarios.leer", "nomina.leer_todo", "nomina.leer", "nomina.procesar", "nomina.configurar", "nomina.exportar", "prestamos.aprobar", "beneficios.gestionar", "sucursales.gestion", "departamentos.gestion", "cargos.gestion", "onboarding.gestion", "reclutamiento.gestion", "desempeno.gestionar", "documentos.gestionar", "capacitacion.gestionar", "reportes.ver"]	60cdd23e-d098-4c2b-ab9c-83f1aee45642	\N	f	\N
613dba8e-18b5-4649-922f-6ad8a8b72251	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Gerente de Sucursal	["empleados.leer_basico", "asistencia.leer_todo", "asistencia.modificar", "asistencia.aprobar", "turnos.gestion", "vacaciones.aprobar", "onboarding.ver_progreso", "activos.gestionar", "reportes.ver"]	60cdd23e-d098-4c2b-ab9c-83f1aee45642	\N	f	\N
8deb752d-bedd-4a5b-8181-b0f47dafc52f	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Líder de Proyecto	["proyectos.gestion", "proyectos.leer", "tareas.gestion", "empleados.leer_basico", "reportes.ver"]	60cdd23e-d098-4c2b-ab9c-83f1aee45642	\N	f	\N
f9c5b148-5b60-451f-8466-da9862d28bb5	2025-12-20 06:00:22.916107+00	2025-12-20 06:00:22.916107+00	Colaborador	["perfil.me", "nomina.leer_propia", "asistencia.leer_propia", "vacaciones.solicitar", "prestamos.solicitar", "onboarding.mi_progreso", "tareas.leer_propias", "tareas.ejecutar", "proyectos.leer"]	60cdd23e-d098-4c2b-ab9c-83f1aee45642	\N	t	\N
f8f291c4-4fb3-47b5-a6db-e07d213a46e7	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Super Admin	["*"]	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	\N	f	\N
4d5745af-8a8f-4baf-85bb-6a848c9f68de	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Super Admin	["*"]	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	f	\N
4b699df4-9da7-4524-b2aa-ce185f9f160c	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Gerente de RRHH	["empleados.leer_basico", "empleados.leer_sensible", "empleados.gestion", "empleados.editar", "empleados.borrar", "empleados.exportar", "salarios.leer", "nomina.leer_todo", "nomina.leer", "nomina.procesar", "nomina.configurar", "nomina.exportar", "prestamos.aprobar", "beneficios.gestionar", "sucursales.gestion", "departamentos.gestion", "cargos.gestion", "onboarding.gestion", "reclutamiento.gestion", "desempeno.gestionar", "documentos.gestionar", "capacitacion.gestionar", "reportes.ver"]	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	f	\N
1c6696ed-a051-4f6b-8431-b7b1a8505423	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Gerente de Sucursal	["empleados.leer_basico", "asistencia.leer_todo", "asistencia.modificar", "asistencia.aprobar", "turnos.gestion", "vacaciones.aprobar", "onboarding.ver_progreso", "activos.gestionar", "reportes.ver"]	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	f	\N
2c482a19-850e-4f82-a7de-622a91fa8ab8	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Líder de Proyecto	["proyectos.gestion", "proyectos.leer", "tareas.gestion", "empleados.leer_basico", "reportes.ver"]	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	f	\N
32ca3f69-d957-45c6-b6e4-2ab1834325f6	2025-12-20 05:28:43.722696+00	2025-12-20 05:28:43.722696+00	Colaborador	["perfil.me", "nomina.leer_propia", "asistencia.leer_propia", "vacaciones.solicitar", "prestamos.solicitar", "onboarding.mi_progreso", "tareas.leer_propias", "tareas.ejecutar", "proyectos.leer"]	67f7cfd0-9099-44f2-9a28-3609cb8ef272	\N	t	\N
e1f1ae8a-68ff-4af3-a619-248f5ace8087	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Super Admin	["*"]	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	f	\N
71c8b307-7291-4386-b14e-0d8d2dd4926f	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Gerente de RRHH	["empleados.leer_basico", "empleados.leer_sensible", "empleados.gestion", "empleados.editar", "empleados.borrar", "empleados.exportar", "salarios.leer", "nomina.leer_todo", "nomina.leer", "nomina.procesar", "nomina.configurar", "nomina.exportar", "prestamos.aprobar", "beneficios.gestionar", "sucursales.gestion", "departamentos.gestion", "cargos.gestion", "onboarding.gestion", "reclutamiento.gestion", "desempeno.gestionar", "documentos.gestionar", "capacitacion.gestionar", "reportes.ver"]	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	f	\N
86862601-d2ba-4de1-8426-422a64334ded	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Gerente de Sucursal	["empleados.leer_basico", "asistencia.leer_todo", "asistencia.modificar", "asistencia.aprobar", "turnos.gestion", "vacaciones.aprobar", "onboarding.ver_progreso", "activos.gestionar", "reportes.ver"]	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	f	\N
aa03530c-6181-4037-8cbe-5034775b3a83	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Líder de Proyecto	["proyectos.gestion", "proyectos.leer", "tareas.gestion", "empleados.leer_basico", "reportes.ver"]	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	f	\N
a233785c-82cb-4e55-9273-72fa10b1b14b	2025-12-20 05:34:10.010546+00	2025-12-20 05:34:10.010546+00	Colaborador	["perfil.me", "nomina.leer_propia", "asistencia.leer_propia", "vacaciones.solicitar", "prestamos.solicitar", "onboarding.mi_progreso", "tareas.leer_propias", "tareas.ejecutar", "proyectos.leer"]	24dce8fe-3132-463d-917c-c19fe787b8c6	\N	t	\N
b529842d-4456-4034-87e8-b6ac3289ecab	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Gerente de RRHH	["empleados.leer_basico", "empleados.leer_sensible", "empleados.gestion", "empleados.editar", "empleados.borrar", "empleados.exportar", "salarios.leer", "nomina.leer_todo", "nomina.leer", "nomina.procesar", "nomina.configurar", "nomina.exportar", "prestamos.aprobar", "beneficios.gestionar", "sucursales.gestion", "departamentos.gestion", "cargos.gestion", "onboarding.gestion", "reclutamiento.gestion", "desempeno.gestionar", "documentos.gestionar", "capacitacion.gestionar", "reportes.ver"]	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	\N	f	\N
93805616-08a7-43ff-b7a0-3d1d61c824bd	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Gerente de Sucursal	["empleados.leer_basico", "asistencia.leer_todo", "asistencia.modificar", "asistencia.aprobar", "turnos.gestion", "vacaciones.aprobar", "onboarding.ver_progreso", "activos.gestionar", "reportes.ver"]	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	\N	f	\N
77ba9d94-abff-4e69-8a6e-2c4cb844501e	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Líder de Proyecto	["proyectos.gestion", "proyectos.leer", "tareas.gestion", "empleados.leer_basico", "reportes.ver"]	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	\N	f	\N
60fa0be0-ae0e-402b-8660-816d28e340f4	2025-12-20 06:12:01.767074+00	2025-12-20 06:12:01.767074+00	Colaborador	["perfil.me", "nomina.leer_propia", "asistencia.leer_propia", "vacaciones.solicitar", "prestamos.solicitar", "onboarding.mi_progreso", "tareas.leer_propias", "tareas.ejecutar", "proyectos.leer"]	036d7acf-8470-4c6c-ab20-e7c6a3aa2c14	\N	t	\N
a24a1b78-2b2a-46fa-bf87-963b07d0e4e6	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Super Admin	["*"]	f99851b0-65cd-48b5-88de-e95e7944a380	\N	f	\N
5e667a90-3c46-47fe-9922-b8928e59de4b	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	Administrador	["esAdmin", "puedeVerTodo"]	8904d395-93eb-4171-b148-fe9f10133955	\N	f	\N
fd570a79-4ba8-47a3-9a65-43a16ddcffa6	2025-12-12 05:25:50.422375+00	2025-12-16 17:45:51.295907+00	Rol Empleado BASE	[]	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	f	\N
50b0fdc2-3de5-486b-8ce1-91e032f040a4	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Gerente de RRHH	["empleados.leer_basico", "empleados.leer_sensible", "empleados.gestion", "empleados.editar", "empleados.borrar", "empleados.exportar", "salarios.leer", "nomina.leer_todo", "nomina.leer", "nomina.procesar", "nomina.configurar", "nomina.exportar", "prestamos.aprobar", "beneficios.gestionar", "sucursales.gestion", "departamentos.gestion", "cargos.gestion", "onboarding.gestion", "reclutamiento.gestion", "desempeno.gestionar", "documentos.gestionar", "capacitacion.gestionar", "reportes.ver"]	f99851b0-65cd-48b5-88de-e95e7944a380	\N	f	\N
66c7d888-48ae-4663-9276-a58eb79680fa	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Gerente de Sucursal	["empleados.leer_basico", "asistencia.leer_todo", "asistencia.modificar", "asistencia.aprobar", "turnos.gestion", "vacaciones.aprobar", "onboarding.ver_progreso", "activos.gestionar", "reportes.ver"]	f99851b0-65cd-48b5-88de-e95e7944a380	\N	f	\N
c2ca4e4c-3b5e-45cc-bf1f-d70de89e2b1b	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Líder de Proyecto	["proyectos.gestion", "proyectos.leer", "tareas.gestion", "empleados.leer_basico", "reportes.ver"]	f99851b0-65cd-48b5-88de-e95e7944a380	\N	f	\N
332e11db-7859-4be9-8d14-064aa40cc7eb	2025-12-20 06:13:14.569059+00	2025-12-20 06:13:14.569059+00	Colaborador	["perfil.me", "nomina.leer_propia", "asistencia.leer_propia", "vacaciones.solicitar", "prestamos.solicitar", "onboarding.mi_progreso", "tareas.leer_propias", "tareas.ejecutar", "proyectos.leer"]	f99851b0-65cd-48b5-88de-e95e7944a380	\N	t	\N
5f79c09d-474f-481f-a177-97755549b116	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	Administrador	["esAdmin", "puedeVerTodo"]	61e81ec9-8d21-460b-81b3-addc2df089a4	\N	f	\N
e879137e-6c6e-4318-82f6-2c01df53093a	2025-11-12 16:16:08.968761+00	2025-12-16 17:45:51.295907+00	Rol de Prueba (Admin)	[]	d845d7a9-9dcf-4db3-95f3-131b93e40673	2025-11-13 15:25:43.987177+00	f	\N
63b5fcb2-2fd6-4454-bf05-0f75a13a1227	2025-11-09 02:22:31.016007+00	2025-12-16 17:45:51.295907+00	Rol de Prueba	["empleados.leer", "nomina.exportar", "asistencia.registro", "asistencia.reportes", "desempeno.ciclos.read", "desempeno.objetivos.read", "desempeno.objetivos.create", "desempeno.objetivos.update"]	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	f	\N
9d8d7df7-ed94-4882-8936-799a2dc35a2e	2025-11-08 05:57:28.62905+00	2025-12-16 17:45:51.295907+00	Administrador	["esAdmin", "nomina.leer", "reportes.ver", "empleados.leer", "empleados.crear", "nomina.exportar", "nomina.procesar", "roles.gestionar", "empleados.borrar", "empleados.editar", "tareas.gestionar", "activos.gestionar", "nomina.configurar", "asistencia.aprobar", "empleados.exportar", "empresa.configurar", "usuarios.gestionar", "desempeno.gestionar", "asistencia.leer_todo", "beneficios.gestionar", "documentos.gestionar", "onboarding.gestionar", "capacitacion.gestionar", "reclutamiento.gestionar"]	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	f	\N
9b0fa648-2d0f-4531-8f8d-7e3a826961c7	2025-12-16 17:45:51.295907+00	2025-12-16 17:45:51.295907+00	Rol de prueba 2	["empleados.leer", "empleados.crear", "empleados.borrar", "empleados.editar", "empleados.exportar"]	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	t	\N
b74f3f4d-3422-4ffa-a816-343f8d4b556d	2025-12-20 06:30:01.612+00	2025-12-24 05:56:35.418376+00	Super Admin	["*"]	a5edc1dd-9410-4a40-986b-d280e10af715	\N	f	\N
59363bc0-b302-4481-bdbf-2442b2e68451	2025-12-20 06:30:01.612+00	2025-12-24 05:56:35.418376+00	Gerente de RRHH	["empleados.leer_basico", "empleados.leer_sensible", "empleados.gestion", "empleados.editar", "empleados.borrar", "empleados.exportar", "salarios.leer", "nomina.leer_todo", "nomina.leer", "nomina.procesar", "nomina.configurar", "nomina.exportar", "prestamos.aprobar", "beneficios.gestionar", "sucursales.gestion", "departamentos.gestion", "cargos.gestion", "onboarding.gestion", "reclutamiento.gestion", "desempeno.gestionar", "documentos.gestionar", "capacitacion.gestionar", "reportes.ver"]	a5edc1dd-9410-4a40-986b-d280e10af715	\N	f	\N
8e61e6b1-34f1-4dfe-96a1-2b34bd0309e4	2025-12-20 06:30:01.612+00	2025-12-24 05:56:35.418376+00	Gerente de Sucursal	["empleados.leer_basico", "asistencia.leer_todo", "asistencia.modificar", "asistencia.aprobar", "turnos.gestion", "vacaciones.aprobar", "onboarding.ver_progreso", "activos.gestionar", "reportes.ver"]	a5edc1dd-9410-4a40-986b-d280e10af715	\N	f	\N
57a26648-434e-463a-98c5-2d1e776aad99	2025-12-20 06:30:01.612+00	2025-12-24 05:56:35.418376+00	Líder de Proyecto	["proyectos.gestion", "proyectos.leer", "tareas.gestion", "empleados.leer_basico", "reportes.ver"]	a5edc1dd-9410-4a40-986b-d280e10af715	\N	f	\N
2525fb5e-2942-4ff4-913f-1243afd4f6ec	2025-12-20 06:30:01.612+00	2025-12-20 06:30:01.612+00	Colaborador	["perfil.me", "nomina.leer_propia", "asistencia.leer_propia", "vacaciones.solicitar", "prestamos.solicitar", "onboarding.mi_progreso", "tareas.leer_propias", "tareas.ejecutar", "proyectos.leer", "gastos.reportar"]	a5edc1dd-9410-4a40-986b-d280e10af715	\N	t	\N
\.


--
-- Data for Name: rubros_nomina; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.rubros_nomina (id, "createdAt", "updatedAt", tipo, concepto, valor, "nominaEmpleadoId", "deletedAt") FROM stdin;
0cd23307-f7a4-48c0-8e95-24bee1e2a015	2025-11-15 16:03:20.49983+00	2025-11-15 16:03:20.49983+00	Ingreso	Salario Base (Actualizado)	0	89a01eaa-f8c8-4e04-9495-c7eed96d85fa	\N
558fdbb2-6179-4646-a5cf-d3260ce93716	2025-11-15 16:03:20.49983+00	2025-11-15 16:03:20.49983+00	Egreso	Aporte IESS (9.45%)	0	89a01eaa-f8c8-4e04-9495-c7eed96d85fa	\N
df674aeb-05fd-4622-ba0a-4f2fe1b052ff	2025-11-15 16:03:20.49983+00	2025-11-15 16:03:20.49983+00	Ingreso	Salario Base (Actualizado)	0	22b365b8-155c-4be0-8867-e21dd11e6ef3	\N
55fa8e39-2350-4416-8597-74be6736e705	2025-11-15 16:03:20.49983+00	2025-11-15 16:03:20.49983+00	Egreso	Aporte IESS (9.45%)	4725	22b365b8-155c-4be0-8867-e21dd11e6ef3	\N
6096f9d0-bf2b-4b3f-adb2-83c47a9793a7	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	Ingreso	Salario Base	0	ce8420a8-244c-43a1-ab58-4ef3f070ab27	\N
d18e1afd-5c3c-45e1-8586-ff073e076465	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	Ingreso	Salario Base	50000	383cac55-b981-4fb3-bad4-4edcfc692f4b	\N
fd220bb8-91a1-44f0-aa1b-dedc17b396f9	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	Egreso	Aporte Patronal	5500	383cac55-b981-4fb3-bad4-4edcfc692f4b	\N
1cd1b485-93e7-440e-a9da-136be304cc91	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	Ingreso	Salario Base	1500	a36773d1-6eca-4e4c-8767-7f058562e0b7	\N
c8fd7530-437d-43cc-a2e3-965464b01a2b	2025-12-10 20:59:46.25652+00	2025-12-10 20:59:46.25652+00	Egreso	Aporte Patronal	165	a36773d1-6eca-4e4c-8767-7f058562e0b7	\N
8bebe393-d417-4eee-82cf-517fd0c5388f	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	0	99f988fd-fab5-447e-9ef3-e14dc70bba49	\N
763f2a67-b855-45cf-800d-c67be22176a6	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	1500	7a516a7d-e106-47e6-afe3-24b766caa219	\N
2f6cb6dc-2b0a-4ca2-a2ee-417e68d1a366	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	2500.5	005373e0-75b4-4381-9ede-a0e7e3a95f71	\N
d311cd4d-e877-4492-8310-2f34d1cb8ba0	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	3200	925ef08c-07e8-45da-80f9-ee415b7707f8	\N
3adabdd5-70ec-4801-b223-add4e5530234	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	800	c6afbc67-3efc-4681-bff0-dbb2e96786f0	\N
dff4b5fe-dfee-448f-b2c6-8784e40a9576	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	400	0e5a626d-3df1-457c-bde5-73df0316403d	\N
c0f1f4de-c8d8-403f-9bcc-185e35c04f59	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	2300	fe734dfb-62c7-43fb-b6f7-f243c41a76ca	\N
2dc30d0e-d64b-4286-bb9d-649471484280	2025-12-25 02:04:56.928466+00	2025-12-25 02:04:56.928466+00	Ingreso	Salario Base	2	be25811d-3a43-4690-8e78-862c575b0dc4	\N
\.


--
-- Data for Name: solicitudes_vacaciones; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.solicitudes_vacaciones (id, "createdAt", "updatedAt", "deletedAt", "fechaInicio", "fechaFin", "diasSolicitados", estado, comentario, "respuestaAdmin", "empleadoId", "comentariosRespuesta", "fechaRespuesta") FROM stdin;
6495fa72-0803-4a3f-89ef-b2c7088a63fd	2025-11-23 20:40:04.957855+00	2025-11-23 20:40:04.957855+00	\N	2025-11-26	2025-11-29	4	PENDIENTE	Solicitud desde Dashboard	\N	7ca7fc59-9a54-4639-9693-e22e33a63244	\N	\N
33e42193-ff93-48fd-a59a-8fe8563c46f3	2025-12-03 14:19:14.330817+00	2025-12-03 14:19:14.330817+00	\N	2025-12-11	2025-12-18	8	PENDIENTE	Solicitud desde Dashboard	\N	7ca7fc59-9a54-4639-9693-e22e33a63244	\N	\N
9e36081d-0f77-4c7c-879a-f2f3e314b3ee	2025-12-22 00:30:44.311937+00	2025-12-23 18:57:12.259287+00	\N	2025-12-24	2025-12-31	8	APROBADA	Solicitud desde Dashboard	\N	a375538e-94fe-4d2c-9a3a-eb42a03d26f6	Aprobado desde Overview	2025-12-23 18:57:12.245
e5a00556-2ab4-433f-81db-71fdee16bdcc	2025-12-23 19:01:55.333293+00	2025-12-23 19:02:16.058718+00	\N	2025-12-23	2025-12-31	9	APROBADA	Solicitud desde Dashboard	\N	81b2d249-202d-4b8f-b84b-440c668ee216	Aprobado desde Overview	2025-12-23 19:02:16.049
dfb81477-5aa0-4d36-90f8-dbb3d1e7abec	2025-12-24 06:14:04.953421+00	2025-12-24 06:38:19.442516+00	\N	2025-12-29	2025-12-31	3	APROBADA	Solicitud desde Dashboard	\N	a375538e-94fe-4d2c-9a3a-eb42a03d26f6	Aprobado desde Centro	2025-12-24 06:38:19.436
\.


--
-- Data for Name: sprints; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.sprints (id, "createdAt", "updatedAt", nombre, "fechaInicio", "fechaFin", "proyectoId", "deletedAt") FROM stdin;
22d22349-67e3-4199-9b6f-87b6bcf83149	2025-11-18 15:39:29.614644+00	2025-11-18 15:41:09.476602+00	Sprint 1: Configuración Backend (Renombrado)	2025-12-01	2025-12-15	24ffc3f6-dd3a-4e17-8f3d-f5af06767827	2025-11-18 15:41:09.476602+00
e917ba11-b2b0-452d-95e3-65212f7ecd3a	2025-11-19 20:22:16.113962+00	2025-11-19 20:22:16.113962+00	Sprint 1: Configuración Inicial	2025-12-01	2025-12-15	24ffc3f6-dd3a-4e17-8f3d-f5af06767827	\N
2470e5bc-d50a-4419-932b-59d178e54a7e	2025-11-19 20:55:59.29945+00	2025-11-19 20:55:59.29945+00	Sprint 1: Backend Core	2025-11-20	2025-12-05	24ffc3f6-dd3a-4e17-8f3d-f5af06767827	\N
b9962651-5d71-4177-b43d-9c899cfebe7a	2025-11-24 04:51:26.392705+00	2025-11-24 04:51:26.392705+00	Sprint 1: Fundamentos	2025-10-27	2025-11-10	ba26c0b6-dda7-4a91-9091-6e837674fecf	\N
c389a14c-1883-444f-a527-c97105f6b6cf	2025-11-24 04:51:26.423443+00	2025-11-24 04:51:26.423443+00	Sprint 2: Autenticación	2025-11-17	2025-12-01	ba26c0b6-dda7-4a91-9091-6e837674fecf	\N
24132e76-3b5f-4d55-bcbb-ce38f6eee07b	2025-11-24 04:51:26.438392+00	2025-11-24 04:51:26.438392+00	Sprint 3: Dashboard Principal	2025-12-02	2025-12-16	ba26c0b6-dda7-4a91-9091-6e837674fecf	\N
478cbf73-d884-4084-a24f-8ccf3f6a55a2	2025-12-05 17:40:33.755252+00	2025-12-05 17:40:33.755252+00	Sprint Prueba 	2025-12-05	2025-12-19	3428358d-5c37-4766-a101-7723f36f999e	\N
\.


--
-- Data for Name: sucursales; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.sucursales (id, "createdAt", "updatedAt", "deletedAt", nombre, direccion, telefono, activa, "empresaId", "jefeId") FROM stdin;
b68f5b5c-14dc-4477-be9e-90cfe778a038	2025-11-27 18:09:40.215701+00	2025-11-27 18:09:40.215701+00	\N	Matriz Centro	Av. Amazonas y Naciones Unidas	\N	t	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N
e305608f-24d0-46f4-892a-04dd92817db6	2025-12-20 20:35:27.35374+00	2025-12-20 20:35:27.35374+00	\N	Sede Zamora	Diego de Vaca y 24 de Mayo	111111111	t	a5edc1dd-9410-4a40-986b-d280e10af715	90a07dc8-8feb-4582-8830-425e388d441a
dd146528-e6c8-4970-a572-10e7b6f94429	2025-12-20 20:36:53.393243+00	2025-12-20 20:36:53.393243+00	\N	Sede Loja	Av. Pio Jaramillo	11111111111111111111111	t	a5edc1dd-9410-4a40-986b-d280e10af715	99d62f5a-86e8-4844-9488-1da5bde6317c
\.


--
-- Data for Name: tareas; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.tareas (id, "createdAt", "updatedAt", "deletedAt", titulo, descripcion, "puntosHistoria", estado, prioridad, "proyectoId", "sprintId", "objetivoId") FROM stdin;
436e895d-9e2f-47ae-82f7-e9709187f915	2025-11-19 20:58:50.844693+00	2025-11-19 21:01:33.843244+00	2025-11-19 21:01:33.843244+00	Tarea de Prueba Prioridad	Ya está el endpoint, falta validar el token.	3	EN_PROGRESO	MEDIA	24ffc3f6-dd3a-4e17-8f3d-f5af06767827	2470e5bc-d50a-4419-932b-59d178e54a7e	\N
4f51cae9-17c4-47f7-b441-e1d53ac4b04b	2025-11-24 04:51:26.406814+00	2025-11-24 04:51:26.406814+00	\N	Configurar Repositorio Git	Inicializar repo y configurar ramas	3	COMPLETADA	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	b9962651-5d71-4177-b43d-9c899cfebe7a	\N
42906d45-57bf-4ea2-b6d5-32231235d96b	2025-11-24 04:51:26.406814+00	2025-11-24 04:51:26.406814+00	\N	Diseñar Esquema DB	Crear diagrama ER y tablas principales	5	COMPLETADA	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	b9962651-5d71-4177-b43d-9c899cfebe7a	\N
eae5c510-aa73-4ce2-a96b-1e48b3cb697d	2025-11-24 04:51:26.406814+00	2025-11-24 04:51:26.406814+00	\N	Setup CI/CD	Configurar pipeline de despliegue	3	COMPLETADA	MEDIA	ba26c0b6-dda7-4a91-9091-6e837674fecf	b9962651-5d71-4177-b43d-9c899cfebe7a	\N
6ca38155-77ee-459e-8e94-81f9627b993f	2025-11-24 04:51:26.430148+00	2025-11-24 04:51:26.430148+00	\N	API Endpoint Login	Crear endpoint POST /auth/login con validación	8	COMPLETADA	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	c389a14c-1883-444f-a527-c97105f6b6cf	\N
18601ac1-d764-4873-a17b-b08ef43b670f	2025-11-24 04:51:26.430148+00	2025-11-24 04:51:26.430148+00	\N	Pantalla Login Mobile	Diseñar e implementar UI de login	5	EN_PROGRESO	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	c389a14c-1883-444f-a527-c97105f6b6cf	\N
d6a242fe-e824-4833-9ed1-d31f96222c3e	2025-11-24 04:51:26.430148+00	2025-11-24 04:51:26.430148+00	\N	Validación JWT	Implementar middleware de validación de tokens	3	EN_PROGRESO	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	c389a14c-1883-444f-a527-c97105f6b6cf	\N
be3cd3ab-ea2f-4274-9d36-6ece33de709d	2025-11-24 04:51:26.430148+00	2025-11-24 04:51:26.430148+00	\N	Registro de Usuarios	Crear flujo completo de registro	5	PENDIENTE	MEDIA	ba26c0b6-dda7-4a91-9091-6e837674fecf	c389a14c-1883-444f-a527-c97105f6b6cf	\N
78cfa130-6d2d-42aa-ac3c-aac18c7b5e08	2025-11-24 04:51:26.430148+00	2025-11-24 04:51:26.430148+00	\N	Reset de Password	Implementar recuperación de contraseña	3	PENDIENTE	BAJA	ba26c0b6-dda7-4a91-9091-6e837674fecf	c389a14c-1883-444f-a527-c97105f6b6cf	\N
f747f889-5aeb-416c-b6e5-82e8057c48d0	2025-11-24 04:51:26.445488+00	2025-11-24 04:51:26.445488+00	\N	Diseño UI Dashboard	Crear mockups y flujo de navegación	5	PENDIENTE	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	24132e76-3b5f-4d55-bcbb-ce38f6eee07b	\N
702c0a11-8e66-4002-b3ea-1d2a346c3143	2025-11-24 04:51:26.445488+00	2025-11-24 04:51:26.445488+00	\N	API de Métricas	Endpoint para estadísticas del usuario	8	PENDIENTE	ALTA	ba26c0b6-dda7-4a91-9091-6e837674fecf	24132e76-3b5f-4d55-bcbb-ce38f6eee07b	\N
c64f6429-e718-4400-b329-835a19eeacc7	2025-11-24 04:51:26.445488+00	2025-11-24 04:51:26.445488+00	\N	Gráficos Interactivos	Implementar charts con animaciones	13	PENDIENTE	MEDIA	ba26c0b6-dda7-4a91-9091-6e837674fecf	24132e76-3b5f-4d55-bcbb-ce38f6eee07b	\N
cdbb5cd4-2d20-46ed-abb9-d7a6b72f8626	2025-11-19 21:26:02.606684+00	2025-12-13 05:37:21.004772+00	\N	Tarea de Prueba Prioridad	Probando que no sea null	3	PENDIENTE	MEDIA	24ffc3f6-dd3a-4e17-8f3d-f5af06767827	2470e5bc-d50a-4419-932b-59d178e54a7e	\N
\.


--
-- Data for Name: tareas_empleado; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.tareas_empleado (id, "createdAt", "updatedAt", "deletedAt", "empleadoId", titulo, descripcion, enlace, completado, "plantillaOrigenId") FROM stdin;
c7f36168-e47e-4979-9c72-ddc4f1e83076	2025-12-19 06:40:41.179716+00	2025-12-19 17:05:22.935731+00	\N	fa703991-ff73-4097-825b-19355d867255	Completa tu Perfil	Sube tu foto y actualiza tu teléfono de contacto.	/dashboard/my-profile	t	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
0063ce2c-b091-4fe7-aa6f-936291e6564d	2025-12-19 06:40:41.179716+00	2025-12-19 17:05:28.842791+00	\N	fa703991-ff73-4097-825b-19355d867255	Video de Bienvenida	Mira el mensaje de nuestro CEO sobre la cultura de la empresa.	\N	t	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
0b6e2e21-d200-4a3f-9c36-ade835b16539	2025-12-19 06:40:41.179716+00	2025-12-19 17:05:30.619199+00	\N	fa703991-ff73-4097-825b-19355d867255	Políticas de Seguridad	Lee y acepta el manual de seguridad de la información.	/dashboard/policies	t	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
f485c105-51ad-4040-84bd-33989df2dde2	2025-12-19 06:40:41.179716+00	2025-12-19 17:05:32.039277+00	\N	fa703991-ff73-4097-825b-19355d867255	Configuración de Correo	Asegúrate de tener acceso a tu email corporativo.	\N	t	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
\.


--
-- Data for Name: tareas_plantilla; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.tareas_plantilla (id, "createdAt", "updatedAt", "deletedAt", titulo, descripcion, enlace, "plantillaId") FROM stdin;
6044767f-f6bd-4a7e-ad8a-17fa68a288da	2025-12-19 06:40:41.147334+00	2025-12-19 06:40:41.147334+00	\N	Video de Bienvenida	Mira el mensaje de nuestro CEO sobre la cultura de la empresa.	\N	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
6ce1664b-b149-4c7b-8275-894b5da762bc	2025-12-19 06:40:41.147334+00	2025-12-19 06:40:41.147334+00	\N	Políticas de Seguridad	Lee y acepta el manual de seguridad de la información.	/dashboard/policies	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
b00c9a00-237b-441a-8b48-f146d8208bb1	2025-12-19 06:40:41.147334+00	2025-12-19 06:40:41.147334+00	\N	Configuración de Correo	Asegúrate de tener acceso a tu email corporativo.	\N	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
6d46f3fb-1478-4bbe-9393-1e785447467b	2025-12-19 06:40:41.147334+00	2025-12-19 06:40:41.147334+00	\N	Completa tu Perfil	Sube tu foto y actualiza tu teléfono de contacto.	/dashboard/my-profile	55beadfd-eb8c-4a42-8c32-50aecd5dfb91
\.


--
-- Data for Name: timesheets; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.timesheets (id, "createdAt", "updatedAt", fecha, horas, "empleadoId", "tareaId", "deletedAt") FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.usuarios (id, "createdAt", "updatedAt", email, "passwordHash", "emailVerificado", "twoFactorSecret", "deletedAt") FROM stdin;
07ef5af6-1fba-4618-b461-22ccdc263c2b	2025-11-08 05:57:28.62905+00	2025-11-08 05:57:28.62905+00	admin@empresa.com	$2b$10$8gHwTFBXTm2C0Ux0XjFhr.dkPly2JWfTfBqY/atgKw2cZ9nNavp6K	t	\N	\N
7a2b302d-191f-4a9a-875d-42034c723522	2025-11-22 06:15:08.479159+00	2025-11-22 06:15:08.479159+00	ruby02591@gmail.com	$2b$10$2SLeOmyjUUBQk056Ydf9H.qyKfQK0ro28xcHNOcy3KVOOzuBmUSpi	t	\N	\N
f160d896-8729-47cc-a9dc-378cf088c48b	2025-11-23 23:56:48.828769+00	2025-11-23 23:56:48.828769+00	valentinasamaniego5@gmail.com	$2b$10$0d1nwC.E/.WT.diac0jnu.aOD04rE5Yvnpkmosnk.CXswIi8xTSSy	t	\N	\N
9a75b06a-0b74-4592-9e82-4d85c47920cf	2025-11-26 07:03:34.303203+00	2025-11-26 07:03:34.303203+00	jeimy1605@gmail.com	$2b$10$hivicnO2SzVX2niiy86sCON0AX/kTs4dp50wROl4ZVq7Ss2gKrMpO	t	\N	\N
63655701-8952-4e7b-8fc5-0c2106dac2a4	2025-11-26 18:17:12.421871+00	2025-11-26 18:17:12.421871+00	weimsisas@gmail.com	$2b$10$H2PmljKxZI69tUNaTt9Hzefhm8KRtXHDbs6a0Mr1GbJLEvqLbdxPK	t	\N	\N
f734b62b-e1af-4ab4-bad9-5eaa550f849a	2025-11-27 18:11:22.745145+00	2025-11-27 18:11:22.745145+00	gerente@matriz.com	$2b$10$0GEj12.C3idwFL.RgPuFIuDxjWrClLX2jBQVFAiDdsc3Bp6DlU53G	t	\N	\N
b315bcdc-323a-44d1-b8af-7a148b9228f2	2025-11-27 20:11:34.64177+00	2025-11-27 20:11:34.64177+00	jeyxnwn@gmail.com	$2b$10$x7qi0qeb2ukj7G6YqyzTr.zE0m0SdLKiPzcylqEP3sdo4gwiinCza	t	\N	\N
7cc24c3c-3393-417f-94d2-36dd2d318dc3	2025-12-09 17:02:48.315739+00	2025-12-09 17:02:48.315739+00	jeimy1605@gmai.com	$2b$10$qa0j2fBGiQRu4KHHMXa2keD0tZ.Qlf00GEti65JNQ.tiPx44EXbAi	t	\N	\N
f35ee9d2-9fbd-4b57-8bdf-b9580f1208be	2025-12-19 03:31:35.890882+00	2025-12-19 03:31:35.890882+00	juan.perez@empresa.com	$2b$10$k2wbhpFhFodVTCjUx0bAa.l7WBCFV85QeBc58bniQiTYUnfhlVX.a	t	\N	\N
bd8480a4-8b69-47f2-a5fd-ef461b1830a7	2025-12-19 03:31:38.789487+00	2025-12-19 03:31:38.789487+00	pedro.ramirez@empresa.com	$2b$10$MhawrJiH10P0dv8pgtDBQ.JpJk38wdCdk0UjXMh.zWFt4Rna1lTEy	t	\N	\N
539a0df3-e1e0-4abc-87c5-2024b7ab76d3	2025-12-19 03:31:41.059964+00	2025-12-19 03:31:41.059964+00	ana.lopez@empresa.com	$2b$10$tawunsWA3.TrETqsqYUD0u0jCEg4KfGzKA12b6Nm5dvdT1uBguAXG	t	\N	\N
2aa19fb4-c140-4698-adc0-9b0515c12154	2025-12-19 03:37:11.758374+00	2025-12-19 03:37:11.758374+00	maria.gomez@empresa.com	$2b$10$Pm53JXXMgV8KKRXef/gmQ.BbdvvIeUlR.0N0k4NSY4YGXDsqkX/TW	t	\N	\N
919d3d87-42da-4bc0-9234-740233573029	2025-12-19 03:41:52.436637+00	2025-12-19 03:41:52.436637+00	luis.torres@empresa.com	$2b$10$oyBYBNx.JK7Ks4AcZnn6lOVpidOOmfnnD8nv0OQ3ISl3fBEPnhQJS	t	\N	\N
d94163f7-0c0e-44f4-a507-385eb0b71c31	2025-12-22 15:28:52.838916+00	2025-12-22 15:28:52.838916+00	bvalvarez1.1@gmail.com	$2b$10$dCXMfwNDoOzAFTqxbWTTseM4vrZXlzqluvbAECbAyQ6L56co6qVBO	t	\N	\N
\.


--
-- Data for Name: vacantes; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.vacantes (id, "createdAt", "updatedAt", "deletedAt", titulo, descripcion, requisitos, estado, ubicacion, "salarioMin", "salarioMax", "fechaCierre", "empresaId", "departamentoId", "sucursalId") FROM stdin;
15c7ea4d-403d-4280-9364-d7c3d6ea6956	2025-11-21 06:13:15.382395+00	2025-11-21 06:13:15.382395+00	\N	Desarrollador Backend Senior	Buscamos experto en NestJS y Microservicios para liderar el equipo técnico.	Más de 5 años de experiencia. Inglés avanzado. Conocimientos sólidos en AWS y Docker.	PUBLICA	Remoto	2500	3500	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	\N	\N
da238ee2-7f49-4f7e-a003-f2370198d11f	2025-12-04 16:21:36.829889+00	2025-12-04 16:21:36.829889+00	\N	Analista de Datos	Tiene q analizar datos para dar soluciones a la empresa, reportes y sugerir decisiones para el progreso de la empresa 	Trabajo en Equipo, Ingles Avanzado, Liderazgo	PUBLICA	Remoto	1500	1700	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	d3da9e1a-51c0-431e-9668-a4c6727e242f	\N
d0e00f91-58f1-4d17-beee-bd89d6d5ba82	2025-12-04 16:37:26.717338+00	2025-12-04 16:37:26.717338+00	\N	Programador Django	Buscamos a alguien con amplio conocimiento en desarrollo de aplicaciones moviles en django, minimo 3 años de experiencia y proyectos previos	Trabajo en Equipo, Django Senior, 3 años de experiencia	PUBLICA	Presencial	2000	3000	\N	d845d7a9-9dcf-4db3-95f3-131b93e40673	7ee03611-e52b-424a-bca8-345a82d368b0	\N
43c49cc4-6989-4e97-9210-d800cfcdee4c	2025-12-21 22:33:37.591965+00	2025-12-21 22:33:37.591965+00	\N	Prueba Puesto	Probando Varias Cosas a ver si funciona	Trabajo en Equipo	BORRADOR	Remoto	0	200	\N	a5edc1dd-9410-4a40-986b-d280e10af715	54e9a5b1-5f85-47b7-815c-55b8d43aa0f2	dd146528-e6c8-4970-a572-10e7b6f94429
1b126ba5-8f25-4cea-9cdf-4e8116a3c95c	2025-12-20 23:33:29.884249+00	2025-12-21 22:38:22.899644+00	\N	Analista de Datos	Analista de base de datos sr, que pueda tomar decisiones para reducir los costos de la empresa y mejorar la productividad	Trabajo en Equipo	CERRADA	Remoto	800	1000	\N	a5edc1dd-9410-4a40-986b-d280e10af715	54e9a5b1-5f85-47b7-815c-55b8d43aa0f2	dd146528-e6c8-4970-a572-10e7b6f94429
\.


--
-- Data for Name: votos; Type: TABLE DATA; Schema: public; Owner: puntopymes
--

COPY public.votos (id, "createdAt", "updatedAt", "deletedAt", "empleadoId", "encuestaId", "opcionId") FROM stdin;
81e005bc-2301-4e6b-b71a-426a6f2b321f	2025-12-23 15:06:10.680742+00	2025-12-23 15:06:10.680742+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	c2429d4d-9510-431c-85ac-583f511184f9	8c7fe69c-71fa-4fdd-a8d8-beaf58d16dd1
2824d959-a643-442e-bec3-1026f58169c0	2025-12-23 15:10:47.186014+00	2025-12-23 15:10:47.186014+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	98c30b93-c89f-4f13-ba31-d1d45a22ea34	dc9fc2d7-2cda-439e-a3a9-439172b6ce97
31c43a9e-dee5-436b-89db-83bbcddcefe0	2025-12-23 15:11:00.602092+00	2025-12-23 15:11:00.602092+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	bc55881c-28a3-4af6-8508-bf324f171624	002cd226-6f75-4397-8269-e27a4c3ffb8c
61813a12-b99e-41a4-96a0-3052fb9dd11c	2025-12-23 15:11:10.124135+00	2025-12-23 15:11:10.124135+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	ce9e760c-e235-4a19-8e6f-f26b76c574c3	736c02a6-25ff-4679-97c6-5ce635053d85
65c8cbd2-508b-4817-a5ba-9dbe65207689	2025-12-23 15:11:29.567123+00	2025-12-23 15:11:29.567123+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	fde4e6ef-3352-4929-a8aa-fd216de48786	15a63baf-3848-45d6-b559-1193e4925ed1
5edf7a38-7f6b-4541-9449-123773488029	2025-12-23 15:11:37.643112+00	2025-12-23 15:11:37.643112+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	950dff22-6655-48a7-a8af-d90061e3b7f2	e52b394e-17f9-4009-9c15-e916df5be29b
b4577e78-7f74-4505-b464-95ea9b95e536	2025-12-23 15:11:41.510396+00	2025-12-23 15:11:41.510396+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	048d1c89-fb00-458f-a958-42a0d15677f1	fa8e3200-0357-4683-9f8b-a228dec2360d
099b9723-6faa-4571-8a75-fce14ed36fef	2025-12-23 15:11:47.741199+00	2025-12-23 15:11:47.741199+00	\N	b315bcdc-323a-44d1-b8af-7a148b9228f2	bc346ec7-bada-406f-96d6-ad287847d407	fcc79715-b272-4f40-800c-33d745f35a32
\.


--
-- Name: cargos PK_052f813788106484e4ef7cd1745; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY (id);


--
-- Name: timesheets PK_1dc280b68c9353ecce41a34be71; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.timesheets
    ADD CONSTRAINT "PK_1dc280b68c9353ecce41a34be71" PRIMARY KEY (id);


--
-- Name: tareas_empleado PK_2a8dbd773ccd63c5f28f8fe76d7; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas_empleado
    ADD CONSTRAINT "PK_2a8dbd773ccd63c5f28f8fe76d7" PRIMARY KEY (id);


--
-- Name: registros_asistencia PK_36b13209a79c9e8898f70bcd5e6; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.registros_asistencia
    ADD CONSTRAINT "PK_36b13209a79c9e8898f70bcd5e6" PRIMARY KEY (id);


--
-- Name: cursos PK_391c5a635ef6b4bd0a46cb75653; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT "PK_391c5a635ef6b4bd0a46cb75653" PRIMARY KEY (id);


--
-- Name: evaluaciones PK_3b157bcce651495e675cdf96a14; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT "PK_3b157bcce651495e675cdf96a14" PRIMARY KEY (id);


--
-- Name: beneficios_asignados PK_3db0507f72d1e15e419c7d7dd95; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.beneficios_asignados
    ADD CONSTRAINT "PK_3db0507f72d1e15e419c7d7dd95" PRIMARY KEY (id);


--
-- Name: tareas_plantilla PK_3eec8744adb94fc7b30ab484d79; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas_plantilla
    ADD CONSTRAINT "PK_3eec8744adb94fc7b30ab484d79" PRIMARY KEY (id);


--
-- Name: reportes_gasto PK_43ebc9a2289fff60815befbac23; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.reportes_gasto
    ADD CONSTRAINT "PK_43ebc9a2289fff60815befbac23" PRIMARY KEY (id);


--
-- Name: proyectos PK_4763a49914127cbdde2143db52a; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT "PK_4763a49914127cbdde2143db52a" PRIMARY KEY (id);


--
-- Name: objetivos PK_5907ecf0f9be78475e62917b3ac; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.objetivos
    ADD CONSTRAINT "PK_5907ecf0f9be78475e62917b3ac" PRIMARY KEY (id);


--
-- Name: asignaciones_tareas PK_63f7c677b67eabf3d22c29ff348; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.asignaciones_tareas
    ADD CONSTRAINT "PK_63f7c677b67eabf3d22c29ff348" PRIMARY KEY (id);


--
-- Name: sprints PK_6800aa2e0f508561812c4b9afb4; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.sprints
    ADD CONSTRAINT "PK_6800aa2e0f508561812c4b9afb4" PRIMARY KEY (id);


--
-- Name: activos PK_6a8f8eb920ce79c617c5a10e2d9; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos
    ADD CONSTRAINT "PK_6a8f8eb920ce79c617c5a10e2d9" PRIMARY KEY (id);


--
-- Name: candidatos PK_6c36ffb29bd4976e73aa83e60ed; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT "PK_6c36ffb29bd4976e73aa83e60ed" PRIMARY KEY (id);


--
-- Name: departamentos PK_6d34dc0415358a018818c683c1e; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT "PK_6d34dc0415358a018818c683c1e" PRIMARY KEY (id);


--
-- Name: encuesta_opciones PK_6e2b840d34287e99a90bd02678a; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.encuesta_opciones
    ADD CONSTRAINT "PK_6e2b840d34287e99a90bd02678a" PRIMARY KEY (id);


--
-- Name: empleados PK_73a63a6fcb4266219be3eb0ce8a; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "PK_73a63a6fcb4266219be3eb0ce8a" PRIMARY KEY (id);


--
-- Name: periodos_nomina PK_792f971c12b021b6615978c03b6; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.periodos_nomina
    ADD CONSTRAINT "PK_792f971c12b021b6615978c03b6" PRIMARY KEY (id);


--
-- Name: documentos_empresa PK_8a73e530b14e408a12cb2e8ce1e; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.documentos_empresa
    ADD CONSTRAINT "PK_8a73e530b14e408a12cb2e8ce1e" PRIMARY KEY (id);


--
-- Name: tareas PK_9370ac1b0569cacf8cda6815c97; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT "PK_9370ac1b0569cacf8cda6815c97" PRIMARY KEY (id);


--
-- Name: plantillas_onboarding PK_98126d7e1d9804648e901b4f21f; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.plantillas_onboarding
    ADD CONSTRAINT "PK_98126d7e1d9804648e901b4f21f" PRIMARY KEY (id);


--
-- Name: activos_asignados PK_9939ce7adac15e70a6830021c5c; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos_asignados
    ADD CONSTRAINT "PK_9939ce7adac15e70a6830021c5c" PRIMARY KEY (id);


--
-- Name: inscripciones_cursos PK_99a7ea2245fa5f70b43f204413c; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.inscripciones_cursos
    ADD CONSTRAINT "PK_99a7ea2245fa5f70b43f204413c" PRIMARY KEY (id);


--
-- Name: votos PK_9d231aec05098f2c5b5a87bb4d9; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.votos
    ADD CONSTRAINT "PK_9d231aec05098f2c5b5a87bb4d9" PRIMARY KEY (id);


--
-- Name: vacantes PK_a1273f72e3834a05f87ba514ec2; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT "PK_a1273f72e3834a05f87ba514ec2" PRIMARY KEY (id);


--
-- Name: beneficios PK_bf13717178c09a53c95cb6cdb85; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.beneficios
    ADD CONSTRAINT "PK_bf13717178c09a53c95cb6cdb85" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: nominas_empleados PK_c1f6875d4e759b1f5224a3e577f; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.nominas_empleados
    ADD CONSTRAINT "PK_c1f6875d4e759b1f5224a3e577f" PRIMARY KEY (id);


--
-- Name: sucursales PK_c2232960c9e458db5b18d35eeba; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.sucursales
    ADD CONSTRAINT "PK_c2232960c9e458db5b18d35eeba" PRIMARY KEY (id);


--
-- Name: empresas PK_ce7b122b37c6499bfd6520873e1; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY (id);


--
-- Name: contratos PK_cfae35069d6f59da899c17ed397; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT "PK_cfae35069d6f59da899c17ed397" PRIMARY KEY (id);


--
-- Name: encuestas PK_cff77141e81a3b68a91a37691dd; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.encuestas
    ADD CONSTRAINT "PK_cff77141e81a3b68a91a37691dd" PRIMARY KEY (id);


--
-- Name: solicitudes_vacaciones PK_d216a09ba81c0b2c223fda93450; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.solicitudes_vacaciones
    ADD CONSTRAINT "PK_d216a09ba81c0b2c223fda93450" PRIMARY KEY (id);


--
-- Name: ciclos_evaluacion PK_d5eb6504cd80cb7bffcd05c665b; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.ciclos_evaluacion
    ADD CONSTRAINT "PK_d5eb6504cd80cb7bffcd05c665b" PRIMARY KEY (id);


--
-- Name: usuarios PK_d7281c63c176e152e4c531594a8; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id);


--
-- Name: items_gasto PK_d7cb45d41ad47eca7ea2a1af0ee; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.items_gasto
    ADD CONSTRAINT "PK_d7cb45d41ad47eca7ea2a1af0ee" PRIMARY KEY (id);


--
-- Name: conceptos_nomina PK_d81a1c5a4bc79845a74b67a7921; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.conceptos_nomina
    ADD CONSTRAINT "PK_d81a1c5a4bc79845a74b67a7921" PRIMARY KEY (id);


--
-- Name: novedades_nomina PK_e22dba1b2be5d1851fc888bcc57; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.novedades_nomina
    ADD CONSTRAINT "PK_e22dba1b2be5d1851fc888bcc57" PRIMARY KEY (id);


--
-- Name: anuncios PK_e38512a0cf3f4f9452fcdc082de; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.anuncios
    ADD CONSTRAINT "PK_e38512a0cf3f4f9452fcdc082de" PRIMARY KEY (id);


--
-- Name: documentos_empleados PK_e8466a74c254dc822a65610ddc7; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.documentos_empleados
    ADD CONSTRAINT "PK_e8466a74c254dc822a65610ddc7" PRIMARY KEY (id);


--
-- Name: rubros_nomina PK_fce054151a56db25c4243553b12; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.rubros_nomina
    ADD CONSTRAINT "PK_fce054151a56db25c4243553b12" PRIMARY KEY (id);


--
-- Name: sucursales UQ_0a7eea63b27be63ede649fe34a8; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.sucursales
    ADD CONSTRAINT "UQ_0a7eea63b27be63ede649fe34a8" UNIQUE ("jefeId");


--
-- Name: registros_asistencia UQ_0b43d8136fe7f47545979c1a12e; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.registros_asistencia
    ADD CONSTRAINT "UQ_0b43d8136fe7f47545979c1a12e" UNIQUE ("empleadoId", fecha);


--
-- Name: evaluaciones UQ_16b8105275a3cd1998eae6c78f4; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT "UQ_16b8105275a3cd1998eae6c78f4" UNIQUE ("cicloId", "evaluadoId");


--
-- Name: beneficios_asignados UQ_1d2000ad8f20e97e14db4f608b1; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.beneficios_asignados
    ADD CONSTRAINT "UQ_1d2000ad8f20e97e14db4f608b1" UNIQUE ("empleadoId", "beneficioId");


--
-- Name: usuarios UQ_446adfc18b35418aac32ae0b7b5; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE (email);


--
-- Name: asignaciones_tareas UQ_801b438647acae49db43932c905; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.asignaciones_tareas
    ADD CONSTRAINT "UQ_801b438647acae49db43932c905" UNIQUE ("tareaId", "empleadoId");


--
-- Name: votos UQ_a591ce51d113ba55f75a31dcee4; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.votos
    ADD CONSTRAINT "UQ_a591ce51d113ba55f75a31dcee4" UNIQUE ("encuestaId", "empleadoId");


--
-- Name: activos UQ_ca8f6ada0127a402a2ac1d7df11; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos
    ADD CONSTRAINT "UQ_ca8f6ada0127a402a2ac1d7df11" UNIQUE ("empresaId", serial);


--
-- Name: inscripciones_cursos UQ_d536794c7f913aea501a4df4cf2; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.inscripciones_cursos
    ADD CONSTRAINT "UQ_d536794c7f913aea501a4df4cf2" UNIQUE ("cursoId", "empleadoId");


--
-- Name: nominas_empleados UQ_f460a3d5ce1a703fb22cb48ce8b; Type: CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.nominas_empleados
    ADD CONSTRAINT "UQ_f460a3d5ce1a703fb22cb48ce8b" UNIQUE ("periodoId", "empleadoId");


--
-- Name: IDX_00378342099a6dd2ebfb3ccd4d; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_00378342099a6dd2ebfb3ccd4d" ON public.cargos USING btree ("deletedAt");


--
-- Name: IDX_0172679fd2efa49856d27cba2c; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_0172679fd2efa49856d27cba2c" ON public.usuarios USING btree ("deletedAt");


--
-- Name: IDX_0ac620f7774b5bf0c56f243188; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_0ac620f7774b5bf0c56f243188" ON public.nominas_empleados USING btree ("empleadoId");


--
-- Name: IDX_0bf5ddc30feee59ebebaa6b8d2; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_0bf5ddc30feee59ebebaa6b8d2" ON public.inscripciones_cursos USING btree ("empleadoId");


--
-- Name: IDX_100ae0b9d1c95d304c8426884c; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_100ae0b9d1c95d304c8426884c" ON public.beneficios USING btree ("deletedAt");


--
-- Name: IDX_118a696f88976da9b8ffcafb50; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_118a696f88976da9b8ffcafb50" ON public.novedades_nomina USING btree ("empresaId", estado);


--
-- Name: IDX_1476ca51c382cc671c4d0405d1; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_1476ca51c382cc671c4d0405d1" ON public.contratos USING btree ("deletedAt");


--
-- Name: IDX_149783bdb3291033ccd3ef9ee3; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_149783bdb3291033ccd3ef9ee3" ON public.empleados USING btree ("usuarioId");


--
-- Name: IDX_195d169e4d4abf2b670cb6996b; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_195d169e4d4abf2b670cb6996b" ON public.proyectos USING btree ("empresaId");


--
-- Name: IDX_1a6d51963ec83351ddc85a3a63; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_1a6d51963ec83351ddc85a3a63" ON public.documentos_empresa USING btree ("empresaId");


--
-- Name: IDX_1ba1c7b8b68d91ee7b4b2d8c9e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_1ba1c7b8b68d91ee7b4b2d8c9e" ON public.sprints USING btree ("proyectoId");


--
-- Name: IDX_225a016019f53a1ff243d37172; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_225a016019f53a1ff243d37172" ON public.activos_asignados USING btree ("activoId");


--
-- Name: IDX_237cf37f04aca360092dfd1b65; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_237cf37f04aca360092dfd1b65" ON public.periodos_nomina USING btree ("empresaId", estado);


--
-- Name: IDX_253da16de07ee534485714e3da; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_253da16de07ee534485714e3da" ON public.tareas_plantilla USING btree ("deletedAt");


--
-- Name: IDX_25455553cbc65327fdf0254e3a; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_25455553cbc65327fdf0254e3a" ON public.tareas_empleado USING btree ("deletedAt");


--
-- Name: IDX_2c37f7816b0a677e99b635ac8f; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_2c37f7816b0a677e99b635ac8f" ON public.roles USING btree ("empresaId");


--
-- Name: IDX_2cc3bb9bbd57a385f67fc9e1d5; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_2cc3bb9bbd57a385f67fc9e1d5" ON public.departamentos USING btree ("sucursalId");


--
-- Name: IDX_2ea2d775728671a12979854c07; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_2ea2d775728671a12979854c07" ON public.plantillas_onboarding USING btree ("deletedAt");


--
-- Name: IDX_2f117a0e479e54f255c088a728; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_2f117a0e479e54f255c088a728" ON public.objetivos USING btree ("cicloId");


--
-- Name: IDX_33f68ac1c7a48aa1e0e9b4515e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_33f68ac1c7a48aa1e0e9b4515e" ON public.objetivos USING btree ("departamentoId");


--
-- Name: IDX_380afec568aa32421cd37efd26; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_380afec568aa32421cd37efd26" ON public.timesheets USING btree ("empleadoId");


--
-- Name: IDX_3ca8cab5930ef8088b7ede6ef4; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_3ca8cab5930ef8088b7ede6ef4" ON public.documentos_empleados USING btree ("empleadoId");


--
-- Name: IDX_3cbd9fb75353861ae5ae177f49; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_3cbd9fb75353861ae5ae177f49" ON public.tareas USING btree ("deletedAt");


--
-- Name: IDX_3e97450018e5dce414f48e172e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_3e97450018e5dce414f48e172e" ON public.objetivos USING btree ("empleadoId");


--
-- Name: IDX_3f78d86f2780448b6d498c785e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_3f78d86f2780448b6d498c785e" ON public.sucursales USING btree ("deletedAt");


--
-- Name: IDX_40ec52d7d9b50e794bb443f925; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_40ec52d7d9b50e794bb443f925" ON public.vacantes USING btree ("deletedAt");


--
-- Name: IDX_43d95fc248a316eefd63e78948; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_43d95fc248a316eefd63e78948" ON public.departamentos USING btree ("empresaId");


--
-- Name: IDX_443c638f02cf7701b128ceef2e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_443c638f02cf7701b128ceef2e" ON public.conceptos_nomina USING btree ("deletedAt");


--
-- Name: IDX_446adfc18b35418aac32ae0b7b; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_446adfc18b35418aac32ae0b7b" ON public.usuarios USING btree (email);


--
-- Name: IDX_448cae3e056d8ee6472433e817; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_448cae3e056d8ee6472433e817" ON public.anuncios USING btree ("deletedAt");


--
-- Name: IDX_462ad0c7fc2a24c726ae62bc5b; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_462ad0c7fc2a24c726ae62bc5b" ON public.documentos_empresa USING btree ("sucursalId");


--
-- Name: IDX_4b9fad7643aa679deeec1dee37; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_4b9fad7643aa679deeec1dee37" ON public.asignaciones_tareas USING btree ("empleadoId");


--
-- Name: IDX_4cee3ce5f1158c30d7c5045324; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_4cee3ce5f1158c30d7c5045324" ON public.beneficios_asignados USING btree ("deletedAt");


--
-- Name: IDX_4f02bc856693f51b2c76132c7b; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_4f02bc856693f51b2c76132c7b" ON public.candidatos USING btree (email);


--
-- Name: IDX_4f69da18af1619ef5a1b25c87b; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_4f69da18af1619ef5a1b25c87b" ON public.beneficios USING btree ("empresaId");


--
-- Name: IDX_50ed9722b8bf63f7d7937c35f1; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_50ed9722b8bf63f7d7937c35f1" ON public.documentos_empleados USING btree ("deletedAt");


--
-- Name: IDX_51894496d6ab290e478cf64832; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_51894496d6ab290e478cf64832" ON public.nominas_empleados USING btree ("periodoId");


--
-- Name: IDX_59a5d4a9d52033fd3d9475ce21; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_59a5d4a9d52033fd3d9475ce21" ON public.evaluaciones USING btree ("cicloId");


--
-- Name: IDX_5a13671cfdeea948be829260b3; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_5a13671cfdeea948be829260b3" ON public.activos_asignados USING btree ("deletedAt");


--
-- Name: IDX_5d0e013c79545bae9673495325; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_5d0e013c79545bae9673495325" ON public.cursos USING btree ("empresaId");


--
-- Name: IDX_5f678331423509e594580817cc; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_5f678331423509e594580817cc" ON public.empresas USING btree ("deletedAt");


--
-- Name: IDX_616e0a706d4308df7dc8addc87; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_616e0a706d4308df7dc8addc87" ON public.tareas USING btree ("proyectoId");


--
-- Name: IDX_61bb79aeb8a264fa14656077cd; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_61bb79aeb8a264fa14656077cd" ON public.nominas_empleados USING btree ("deletedAt");


--
-- Name: IDX_6327f3032ba5aab212cad4fec2; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_6327f3032ba5aab212cad4fec2" ON public.asignaciones_tareas USING btree ("tareaId");


--
-- Name: IDX_682862faf4b38e899af50935b6; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_682862faf4b38e899af50935b6" ON public.inscripciones_cursos USING btree ("deletedAt");


--
-- Name: IDX_6a9f9a78f47a434b565b9e6471; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_6a9f9a78f47a434b565b9e6471" ON public.evaluaciones USING btree ("evaluadorId");


--
-- Name: IDX_6ad00b1b983aca3e96d1f6a363; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_6ad00b1b983aca3e96d1f6a363" ON public.registros_asistencia USING btree ("empleadoId");


--
-- Name: IDX_6eb1eeff4253564cb785e59a56; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_6eb1eeff4253564cb785e59a56" ON public.vacantes USING btree ("empresaId");


--
-- Name: IDX_757eb28983ba607da79e231ead; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_757eb28983ba607da79e231ead" ON public.sprints USING btree ("deletedAt");


--
-- Name: IDX_75f44988757faac0f5d3dc12ff; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_75f44988757faac0f5d3dc12ff" ON public.candidatos USING btree ("vacanteId");


--
-- Name: IDX_7b91510c8b8ba3bc5d478ec9e1; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_7b91510c8b8ba3bc5d478ec9e1" ON public.evaluaciones USING btree ("deletedAt");


--
-- Name: IDX_7ddc59a0d52e4bb86301c8e1e8; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_7ddc59a0d52e4bb86301c8e1e8" ON public.contratos USING btree ("empleadoId");


--
-- Name: IDX_7eeecc47641df1f4792bc4c79a; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_7eeecc47641df1f4792bc4c79a" ON public.sucursales USING btree ("empresaId");


--
-- Name: IDX_7f286181f2956d518829edd57f; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_7f286181f2956d518829edd57f" ON public.ciclos_evaluacion USING btree ("deletedAt");


--
-- Name: IDX_8c7c18ab8da6a97f4ee8a91a1e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_8c7c18ab8da6a97f4ee8a91a1e" ON public.novedades_nomina USING btree ("deletedAt");


--
-- Name: IDX_8e32e0aa903269cd1a242fbb7f; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_8e32e0aa903269cd1a242fbb7f" ON public.activos USING btree ("empresaId");


--
-- Name: IDX_8fd8bc772aa6115ff84a96a4be; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_8fd8bc772aa6115ff84a96a4be" ON public.periodos_nomina USING btree ("deletedAt");


--
-- Name: IDX_912e87c93e26c5c35691a50e8e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_912e87c93e26c5c35691a50e8e" ON public.timesheets USING btree ("tareaId");


--
-- Name: IDX_922ec390c0bd354a61609e97d8; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_922ec390c0bd354a61609e97d8" ON public.registros_asistencia USING btree ("deletedAt");


--
-- Name: IDX_9289b93de3f1c36d156d2ad12b; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_9289b93de3f1c36d156d2ad12b" ON public.solicitudes_vacaciones USING btree ("deletedAt");


--
-- Name: IDX_99b5d64ac80fdc8969517800e3; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_99b5d64ac80fdc8969517800e3" ON public.timesheets USING btree ("deletedAt");


--
-- Name: IDX_9c67318adf07a67a97c5376cda; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_9c67318adf07a67a97c5376cda" ON public.conceptos_nomina USING btree ("empresaId", tipo);


--
-- Name: IDX_9ee1790d3d994762cc12926462; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_9ee1790d3d994762cc12926462" ON public.empleados USING btree ("deletedAt");


--
-- Name: IDX_9f14f02f35841bebe015b01907; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_9f14f02f35841bebe015b01907" ON public.empleados USING btree ("empresaId", estado);


--
-- Name: IDX_a4b6c6238e72d417296ec109f8; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_a4b6c6238e72d417296ec109f8" ON public.cursos USING btree ("deletedAt");


--
-- Name: IDX_a4c23fdfb3ff37786f28abbbd5; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_a4c23fdfb3ff37786f28abbbd5" ON public.registros_asistencia USING btree (fecha);


--
-- Name: IDX_a55286ef435780bade883c8130; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_a55286ef435780bade883c8130" ON public.candidatos USING btree ("deletedAt");


--
-- Name: IDX_a9adad2defec8e6fc0e3c25fd8; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_a9adad2defec8e6fc0e3c25fd8" ON public.reportes_gasto USING btree ("empleadoId", estado);


--
-- Name: IDX_aaa6c5471e0924fda73c320bc9; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_aaa6c5471e0924fda73c320bc9" ON public.votos USING btree ("deletedAt");


--
-- Name: IDX_b4577a6a04bb57be1608d7b509; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_b4577a6a04bb57be1608d7b509" ON public.vacantes USING btree (estado);


--
-- Name: IDX_b62a1f31acb5e6fa2e55d7b5c0; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_b62a1f31acb5e6fa2e55d7b5c0" ON public.objetivos USING btree ("deletedAt");


--
-- Name: IDX_b72e2e096afb8f4dfcb2c42fd5; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_b72e2e096afb8f4dfcb2c42fd5" ON public.solicitudes_vacaciones USING btree ("empleadoId");


--
-- Name: IDX_b91095d0f11aaec8fe61d18c4f; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_b91095d0f11aaec8fe61d18c4f" ON public.encuestas USING btree ("deletedAt");


--
-- Name: IDX_b98dbcfbeb56601765d0662cbe; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_b98dbcfbeb56601765d0662cbe" ON public.activos USING btree ("deletedAt");


--
-- Name: IDX_bae154d2b09e78367fc9056463; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_bae154d2b09e78367fc9056463" ON public.items_gasto USING btree ("deletedAt");


--
-- Name: IDX_bae287db424133750dbc5e5d46; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_bae287db424133750dbc5e5d46" ON public.asignaciones_tareas USING btree ("deletedAt");


--
-- Name: IDX_be1f98c9025378c4f5ce058a86; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_be1f98c9025378c4f5ce058a86" ON public.activos USING btree ("sucursalId");


--
-- Name: IDX_c09fda078554e9fb501f55d42d; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_c09fda078554e9fb501f55d42d" ON public.rubros_nomina USING btree ("deletedAt");


--
-- Name: IDX_c88bf745ca419a8624641ce529; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_c88bf745ca419a8624641ce529" ON public.tareas_empleado USING btree ("empleadoId");


--
-- Name: IDX_c9b92a66b04bad522daf0fbc68; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_c9b92a66b04bad522daf0fbc68" ON public.departamentos USING btree ("deletedAt");


--
-- Name: IDX_d0e8a883565e5c5a2f5773b4eb; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_d0e8a883565e5c5a2f5773b4eb" ON public.cargos USING btree ("empresaId");


--
-- Name: IDX_d408126f45dc8a007ca71c9852; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_d408126f45dc8a007ca71c9852" ON public.tareas USING btree ("sprintId");


--
-- Name: IDX_d515b154882b104a5f0e8dd907; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_d515b154882b104a5f0e8dd907" ON public.ciclos_evaluacion USING btree ("empresaId");


--
-- Name: IDX_d990e2babdc537d97fbfb84d7e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_d990e2babdc537d97fbfb84d7e" ON public.beneficios_asignados USING btree ("empleadoId");


--
-- Name: IDX_d9e2cfc90369eefabfc26e0082; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_d9e2cfc90369eefabfc26e0082" ON public.reportes_gasto USING btree ("deletedAt");


--
-- Name: IDX_e72912af85f8ca6ac65522f71e; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_e72912af85f8ca6ac65522f71e" ON public.roles USING btree ("deletedAt");


--
-- Name: IDX_e8cf06b03fdf5f2e93a0545617; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_e8cf06b03fdf5f2e93a0545617" ON public.activos_asignados USING btree ("empleadoId");


--
-- Name: IDX_ec4985d0e9fe7fd400a7efae91; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_ec4985d0e9fe7fd400a7efae91" ON public.rubros_nomina USING btree ("nominaEmpleadoId");


--
-- Name: IDX_ed78ef87e61c8c97b82ac4d6d7; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_ed78ef87e61c8c97b82ac4d6d7" ON public.proyectos USING btree ("deletedAt");


--
-- Name: IDX_ee4b455959e2897ce6acdb4313; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_ee4b455959e2897ce6acdb4313" ON public.items_gasto USING btree ("reporteId");


--
-- Name: IDX_eecfe6818d0b140dbe9d0d1674; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_eecfe6818d0b140dbe9d0d1674" ON public.vacantes USING btree ("sucursalId");


--
-- Name: IDX_f0f7c23b855ae6a397d7eecbaf; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_f0f7c23b855ae6a397d7eecbaf" ON public.cargos USING btree ("departamentoId");


--
-- Name: IDX_f1f1e8e36d9303cec451ca081d; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_f1f1e8e36d9303cec451ca081d" ON public.inscripciones_cursos USING btree ("cursoId");


--
-- Name: IDX_f2610f1e59eba594ce0c5bfc06; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_f2610f1e59eba594ce0c5bfc06" ON public.beneficios_asignados USING btree ("beneficioId");


--
-- Name: IDX_f59f5c8dd151d87b374ad24a46; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_f59f5c8dd151d87b374ad24a46" ON public.documentos_empresa USING btree ("deletedAt");


--
-- Name: IDX_fd4a694e65472c9b152c21a8eb; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_fd4a694e65472c9b152c21a8eb" ON public.encuesta_opciones USING btree ("deletedAt");


--
-- Name: IDX_fff0f4e1e18c39b6e5dd47b46c; Type: INDEX; Schema: public; Owner: puntopymes
--

CREATE INDEX "IDX_fff0f4e1e18c39b6e5dd47b46c" ON public.evaluaciones USING btree ("evaluadoId");


--
-- Name: sucursales FK_0a7eea63b27be63ede649fe34a8; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.sucursales
    ADD CONSTRAINT "FK_0a7eea63b27be63ede649fe34a8" FOREIGN KEY ("jefeId") REFERENCES public.empleados(id) ON DELETE SET NULL;


--
-- Name: nominas_empleados FK_0ac620f7774b5bf0c56f2431880; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.nominas_empleados
    ADD CONSTRAINT "FK_0ac620f7774b5bf0c56f2431880" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: inscripciones_cursos FK_0bf5ddc30feee59ebebaa6b8d2e; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.inscripciones_cursos
    ADD CONSTRAINT "FK_0bf5ddc30feee59ebebaa6b8d2e" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: empleados FK_149783bdb3291033ccd3ef9ee39; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_149783bdb3291033ccd3ef9ee39" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON DELETE SET NULL;


--
-- Name: proyectos FK_195d169e4d4abf2b670cb6996b4; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT "FK_195d169e4d4abf2b670cb6996b4" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: documentos_empresa FK_1a6d51963ec83351ddc85a3a633; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.documentos_empresa
    ADD CONSTRAINT "FK_1a6d51963ec83351ddc85a3a633" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: sprints FK_1ba1c7b8b68d91ee7b4b2d8c9e3; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.sprints
    ADD CONSTRAINT "FK_1ba1c7b8b68d91ee7b4b2d8c9e3" FOREIGN KEY ("proyectoId") REFERENCES public.proyectos(id) ON DELETE CASCADE;


--
-- Name: periodos_nomina FK_1fbbaf40e249387c476c010b02e; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.periodos_nomina
    ADD CONSTRAINT "FK_1fbbaf40e249387c476c010b02e" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: vacantes FK_220108aef5004fd6ce20e856429; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT "FK_220108aef5004fd6ce20e856429" FOREIGN KEY ("departamentoId") REFERENCES public.departamentos(id);


--
-- Name: activos_asignados FK_225a016019f53a1ff243d371726; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos_asignados
    ADD CONSTRAINT "FK_225a016019f53a1ff243d371726" FOREIGN KEY ("activoId") REFERENCES public.activos(id) ON DELETE CASCADE;


--
-- Name: objetivos FK_2ae510908643685f87b57960e54; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.objetivos
    ADD CONSTRAINT "FK_2ae510908643685f87b57960e54" FOREIGN KEY ("parentObjetivoId") REFERENCES public.objetivos(id) ON DELETE SET NULL;


--
-- Name: empleados FK_2c350513e4fa3e719fead73902f; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_2c350513e4fa3e719fead73902f" FOREIGN KEY ("jefeId") REFERENCES public.empleados(id) ON DELETE SET NULL;


--
-- Name: roles FK_2c37f7816b0a677e99b635ac8f4; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "FK_2c37f7816b0a677e99b635ac8f4" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: departamentos FK_2cc3bb9bbd57a385f67fc9e1d55; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT "FK_2cc3bb9bbd57a385f67fc9e1d55" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE RESTRICT;


--
-- Name: objetivos FK_2f117a0e479e54f255c088a7288; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.objetivos
    ADD CONSTRAINT "FK_2f117a0e479e54f255c088a7288" FOREIGN KEY ("cicloId") REFERENCES public.ciclos_evaluacion(id) ON DELETE CASCADE;


--
-- Name: objetivos FK_33f68ac1c7a48aa1e0e9b4515e0; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.objetivos
    ADD CONSTRAINT "FK_33f68ac1c7a48aa1e0e9b4515e0" FOREIGN KEY ("departamentoId") REFERENCES public.departamentos(id) ON DELETE CASCADE;


--
-- Name: timesheets FK_380afec568aa32421cd37efd26c; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.timesheets
    ADD CONSTRAINT "FK_380afec568aa32421cd37efd26c" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: encuesta_opciones FK_39cca0a2bd5909b8475f1c5ed06; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.encuesta_opciones
    ADD CONSTRAINT "FK_39cca0a2bd5909b8475f1c5ed06" FOREIGN KEY ("encuestaId") REFERENCES public.encuestas(id) ON DELETE CASCADE;


--
-- Name: documentos_empleados FK_3ca8cab5930ef8088b7ede6ef45; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.documentos_empleados
    ADD CONSTRAINT "FK_3ca8cab5930ef8088b7ede6ef45" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: objetivos FK_3e97450018e5dce414f48e172e7; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.objetivos
    ADD CONSTRAINT "FK_3e97450018e5dce414f48e172e7" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: proyectos FK_4041b912d343011f571d7e512f7; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT "FK_4041b912d343011f571d7e512f7" FOREIGN KEY ("liderId") REFERENCES public.empleados(id) ON DELETE SET NULL;


--
-- Name: departamentos FK_43d95fc248a316eefd63e789481; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT "FK_43d95fc248a316eefd63e789481" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: documentos_empresa FK_462ad0c7fc2a24c726ae62bc5bc; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.documentos_empresa
    ADD CONSTRAINT "FK_462ad0c7fc2a24c726ae62bc5bc" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE CASCADE;


--
-- Name: asignaciones_tareas FK_4b9fad7643aa679deeec1dee37d; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.asignaciones_tareas
    ADD CONSTRAINT "FK_4b9fad7643aa679deeec1dee37d" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: beneficios FK_4f69da18af1619ef5a1b25c87b7; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.beneficios
    ADD CONSTRAINT "FK_4f69da18af1619ef5a1b25c87b7" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: nominas_empleados FK_51894496d6ab290e478cf648327; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.nominas_empleados
    ADD CONSTRAINT "FK_51894496d6ab290e478cf648327" FOREIGN KEY ("periodoId") REFERENCES public.periodos_nomina(id) ON DELETE CASCADE;


--
-- Name: evaluaciones FK_59a5d4a9d52033fd3d9475ce21b; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT "FK_59a5d4a9d52033fd3d9475ce21b" FOREIGN KEY ("cicloId") REFERENCES public.ciclos_evaluacion(id) ON DELETE CASCADE;


--
-- Name: cursos FK_5d0e013c79545bae96734953253; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT "FK_5d0e013c79545bae96734953253" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: tareas FK_616e0a706d4308df7dc8addc87a; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT "FK_616e0a706d4308df7dc8addc87a" FOREIGN KEY ("proyectoId") REFERENCES public.proyectos(id) ON DELETE CASCADE;


--
-- Name: asignaciones_tareas FK_6327f3032ba5aab212cad4fec22; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.asignaciones_tareas
    ADD CONSTRAINT "FK_6327f3032ba5aab212cad4fec22" FOREIGN KEY ("tareaId") REFERENCES public.tareas(id) ON DELETE CASCADE;


--
-- Name: evaluaciones FK_6a9f9a78f47a434b565b9e6471c; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT "FK_6a9f9a78f47a434b565b9e6471c" FOREIGN KEY ("evaluadorId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: registros_asistencia FK_6ad00b1b983aca3e96d1f6a363d; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.registros_asistencia
    ADD CONSTRAINT "FK_6ad00b1b983aca3e96d1f6a363d" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: vacantes FK_6eb1eeff4253564cb785e59a562; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT "FK_6eb1eeff4253564cb785e59a562" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: candidatos FK_75f44988757faac0f5d3dc12ff0; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT "FK_75f44988757faac0f5d3dc12ff0" FOREIGN KEY ("vacanteId") REFERENCES public.vacantes(id) ON DELETE CASCADE;


--
-- Name: conceptos_nomina FK_78ab5f437af70694c4e9f030faa; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.conceptos_nomina
    ADD CONSTRAINT "FK_78ab5f437af70694c4e9f030faa" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: contratos FK_7ddc59a0d52e4bb86301c8e1e82; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT "FK_7ddc59a0d52e4bb86301c8e1e82" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: sucursales FK_7eeecc47641df1f4792bc4c79a7; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.sucursales
    ADD CONSTRAINT "FK_7eeecc47641df1f4792bc4c79a7" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: tareas FK_88fc872f2dcd7382a8276b97da5; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT "FK_88fc872f2dcd7382a8276b97da5" FOREIGN KEY ("objetivoId") REFERENCES public.objetivos(id) ON DELETE SET NULL;


--
-- Name: novedades_nomina FK_8b3ef32bc8cbf58badb17abbdc5; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.novedades_nomina
    ADD CONSTRAINT "FK_8b3ef32bc8cbf58badb17abbdc5" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id);


--
-- Name: activos FK_8e32e0aa903269cd1a242fbb7f0; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos
    ADD CONSTRAINT "FK_8e32e0aa903269cd1a242fbb7f0" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: timesheets FK_912e87c93e26c5c35691a50e8e0; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.timesheets
    ADD CONSTRAINT "FK_912e87c93e26c5c35691a50e8e0" FOREIGN KEY ("tareaId") REFERENCES public.tareas(id) ON DELETE CASCADE;


--
-- Name: empleados FK_9dbe06d2a8b09d970687c40e381; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_9dbe06d2a8b09d970687c40e381" FOREIGN KEY ("rolId") REFERENCES public.roles(id) ON DELETE RESTRICT;


--
-- Name: empleados FK_a1c5f54d096bb28c61a3d550b74; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_a1c5f54d096bb28c61a3d550b74" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE SET NULL;


--
-- Name: empleados FK_af5cb19a7fcf0b5ce2e18f0f9dc; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_af5cb19a7fcf0b5ce2e18f0f9dc" FOREIGN KEY ("cargoId") REFERENCES public.cargos(id) ON DELETE RESTRICT;


--
-- Name: proyectos FK_b4c1ee415a5155af7052e01d699; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT "FK_b4c1ee415a5155af7052e01d699" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE SET NULL;


--
-- Name: solicitudes_vacaciones FK_b72e2e096afb8f4dfcb2c42fd50; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.solicitudes_vacaciones
    ADD CONSTRAINT "FK_b72e2e096afb8f4dfcb2c42fd50" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: activos FK_be1f98c9025378c4f5ce058a86a; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos
    ADD CONSTRAINT "FK_be1f98c9025378c4f5ce058a86a" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE SET NULL;


--
-- Name: anuncios FK_bf5138d8ad8cd5f215481c77067; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.anuncios
    ADD CONSTRAINT "FK_bf5138d8ad8cd5f215481c77067" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE CASCADE;


--
-- Name: votos FK_c5fb480d9afeff7ee0904ef2af5; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.votos
    ADD CONSTRAINT "FK_c5fb480d9afeff7ee0904ef2af5" FOREIGN KEY ("encuestaId") REFERENCES public.encuestas(id);


--
-- Name: empleados FK_c83539d076c65b588f8207c7cbf; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_c83539d076c65b588f8207c7cbf" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: reportes_gasto FK_c9e1d826bfff7caa96a74df107a; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.reportes_gasto
    ADD CONSTRAINT "FK_c9e1d826bfff7caa96a74df107a" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: votos FK_cb495d69c28e80766f3f0391991; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.votos
    ADD CONSTRAINT "FK_cb495d69c28e80766f3f0391991" FOREIGN KEY ("opcionId") REFERENCES public.encuesta_opciones(id);


--
-- Name: tareas FK_d408126f45dc8a007ca71c98528; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT "FK_d408126f45dc8a007ca71c98528" FOREIGN KEY ("sprintId") REFERENCES public.sprints(id) ON DELETE SET NULL;


--
-- Name: ciclos_evaluacion FK_d515b154882b104a5f0e8dd9075; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.ciclos_evaluacion
    ADD CONSTRAINT "FK_d515b154882b104a5f0e8dd9075" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: beneficios_asignados FK_d990e2babdc537d97fbfb84d7e2; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.beneficios_asignados
    ADD CONSTRAINT "FK_d990e2babdc537d97fbfb84d7e2" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: tareas_plantilla FK_dc4b003b1f150bc279f44efa50b; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.tareas_plantilla
    ADD CONSTRAINT "FK_dc4b003b1f150bc279f44efa50b" FOREIGN KEY ("plantillaId") REFERENCES public.plantillas_onboarding(id);


--
-- Name: novedades_nomina FK_e6a1de28c1181223f13ba17b947; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.novedades_nomina
    ADD CONSTRAINT "FK_e6a1de28c1181223f13ba17b947" FOREIGN KEY ("conceptoId") REFERENCES public.conceptos_nomina(id);


--
-- Name: activos_asignados FK_e8cf06b03fdf5f2e93a05456179; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.activos_asignados
    ADD CONSTRAINT "FK_e8cf06b03fdf5f2e93a05456179" FOREIGN KEY ("empleadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: rubros_nomina FK_ec4985d0e9fe7fd400a7efae91e; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.rubros_nomina
    ADD CONSTRAINT "FK_ec4985d0e9fe7fd400a7efae91e" FOREIGN KEY ("nominaEmpleadoId") REFERENCES public.nominas_empleados(id) ON DELETE CASCADE;


--
-- Name: items_gasto FK_ee4b455959e2897ce6acdb43131; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.items_gasto
    ADD CONSTRAINT "FK_ee4b455959e2897ce6acdb43131" FOREIGN KEY ("reporteId") REFERENCES public.reportes_gasto(id) ON DELETE CASCADE;


--
-- Name: vacantes FK_eecfe6818d0b140dbe9d0d16749; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT "FK_eecfe6818d0b140dbe9d0d16749" FOREIGN KEY ("sucursalId") REFERENCES public.sucursales(id) ON DELETE SET NULL;


--
-- Name: cargos FK_f0f7c23b855ae6a397d7eecbaf7; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT "FK_f0f7c23b855ae6a397d7eecbaf7" FOREIGN KEY ("departamentoId") REFERENCES public.departamentos(id) ON DELETE RESTRICT;


--
-- Name: novedades_nomina FK_f1ecd203acdd015123bc145a4b3; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.novedades_nomina
    ADD CONSTRAINT "FK_f1ecd203acdd015123bc145a4b3" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id);


--
-- Name: inscripciones_cursos FK_f1f1e8e36d9303cec451ca081d9; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.inscripciones_cursos
    ADD CONSTRAINT "FK_f1f1e8e36d9303cec451ca081d9" FOREIGN KEY ("cursoId") REFERENCES public.cursos(id) ON DELETE CASCADE;


--
-- Name: beneficios_asignados FK_f2610f1e59eba594ce0c5bfc06c; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.beneficios_asignados
    ADD CONSTRAINT "FK_f2610f1e59eba594ce0c5bfc06c" FOREIGN KEY ("beneficioId") REFERENCES public.beneficios(id) ON DELETE CASCADE;


--
-- Name: evaluaciones FK_fff0f4e1e18c39b6e5dd47b46cb; Type: FK CONSTRAINT; Schema: public; Owner: puntopymes
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT "FK_fff0f4e1e18c39b6e5dd47b46cb" FOREIGN KEY ("evaluadoId") REFERENCES public.empleados(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: puntopymes
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict muevZti0fkb0gFT3Eb69CAhuwYwcau63veD0mDO7jTu1LGyPTtHzMMNaaXVgySu

