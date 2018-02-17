-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-02-2018 a las 01:59:38
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sherlock`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compara`
--

CREATE TABLE `compara` (
  `IDpub` varchar(15) NOT NULL,
  `condicion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion`
--

CREATE TABLE `condicion` (
  `condicion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `demandaedic`
--

CREATE TABLE `demandaedic` (
  `ID` varchar(15) NOT NULL,
  `ventasAFecha` int(15) NOT NULL,
  `fechaAnalisis` varchar(200) NOT NULL,
  `ISBN` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `demandaedicion`
--

CREATE TABLE `demandaedicion` (
  `ISBN` varchar(13) NOT NULL,
  `IDdemanda` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `demandapubuser`
--

CREATE TABLE `demandapubuser` (
  `ID` varchar(15) NOT NULL,
  `ventasAFecha` int(15) NOT NULL,
  `fechaAnalisis` varchar(200) NOT NULL,
  `IDpub` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edicion`
--

CREATE TABLE `edicion` (
  `ISBN` varchar(15) NOT NULL,
  `IDPublicacionEdicion` varchar(15) NOT NULL,
  `IDlibro` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `ID` varchar(15) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `thumbnail` varchar(200) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacionedicion`
--

CREATE TABLE `publicacionedicion` (
  `ID` varchar(15) NOT NULL,
  `precio` float NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `ventas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacionusuario`
--

CREATE TABLE `publicacionusuario` (
  `ID` varchar(15) NOT NULL,
  `titulo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compara`
--
ALTER TABLE `compara`
  ADD KEY `IDpub` (`IDpub`,`condicion`),
  ADD KEY `condicion` (`condicion`);

--
-- Indices de la tabla `condicion`
--
ALTER TABLE `condicion`
  ADD PRIMARY KEY (`condicion`);

--
-- Indices de la tabla `demandaedic`
--
ALTER TABLE `demandaedic`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDedicion` (`ISBN`);

--
-- Indices de la tabla `demandaedicion`
--
ALTER TABLE `demandaedicion`
  ADD KEY `ISBN` (`ISBN`,`IDdemanda`),
  ADD KEY `IDdemanda` (`IDdemanda`);

--
-- Indices de la tabla `demandapubuser`
--
ALTER TABLE `demandapubuser`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDedicion` (`IDpub`);

--
-- Indices de la tabla `edicion`
--
ALTER TABLE `edicion`
  ADD PRIMARY KEY (`ISBN`,`IDPublicacionEdicion`),
  ADD KEY `IDPublicacionEdicion` (`IDPublicacionEdicion`),
  ADD KEY `IDlibro` (`IDlibro`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `publicacionedicion`
--
ALTER TABLE `publicacionedicion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `publicacionusuario`
--
ALTER TABLE `publicacionusuario`
  ADD PRIMARY KEY (`ID`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compara`
--
ALTER TABLE `compara`
  ADD CONSTRAINT `compara_ibfk_1` FOREIGN KEY (`IDpub`) REFERENCES `publicacionusuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compara_ibfk_2` FOREIGN KEY (`condicion`) REFERENCES `condicion` (`condicion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `demandaedic`
--
ALTER TABLE `demandaedic`
  ADD CONSTRAINT `demandaedic_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `edicion` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `demandapubuser`
--
ALTER TABLE `demandapubuser`
  ADD CONSTRAINT `demandapubuser_ibfk_1` FOREIGN KEY (`IDpub`) REFERENCES `publicacionusuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `edicion`
--
ALTER TABLE `edicion`
  ADD CONSTRAINT `edicion_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `demandaedicion` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `edicion_ibfk_2` FOREIGN KEY (`IDPublicacionEdicion`) REFERENCES `publicacionedicion` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `edicion_ibfk_3` FOREIGN KEY (`IDlibro`) REFERENCES `libro` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
