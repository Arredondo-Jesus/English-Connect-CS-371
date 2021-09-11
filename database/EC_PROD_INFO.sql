-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 07, 2021 at 11:28 PM
-- Server version: 10.3.28-MariaDB-log-cll-lve
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creaigwt_english_connect_valle`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `attendance_value` tinyint(1) DEFAULT NULL,
  `lesson` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `day_1` varchar(45) DEFAULT NULL,
  `day_2` varchar(45) NOT NULL,
  `time_1` varchar(45) DEFAULT NULL,
  `time_2` varchar(45) NOT NULL,
  `generation` varchar(45) DEFAULT NULL,
  `stake` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  `instructor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `code`, `name`, `level`, `day_1`, `day_2`, `time_1`, `time_2`, `generation`, `stake`, `created_at`, `modified_on`, `status`, `instructor_id`) VALUES
(2, 1, 'English Connect', 1, 'Martes', 'Sabado', '8:00 p.m.', '8:00 p.m.', '1', 'Mexico City Alamedas Stake', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 2),
(3, 3, 'English Connect', 1, 'Viernes', 'Sabado', '5:00 p.m.', '5:00 p.m.', '1', 'Tampico Mexico Bosque Stake', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 3),
(4, 22, 'English Connect', 2, 'Miercoles', 'Viernes', '8:00 p.m.', '8:00 p.m.', '1', 'Mexico City Tlalnepantla Stake', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 4),
(5, 32, 'English Connect', 1, 'Lunes', 'Miercoles', '12:00 p.m.', '12:00 p.m.', '1', 'Mexico City Tlalnepantla Stake', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 4),
(6, 39, 'English Connect', 2, 'Martes', 'Jueves', '3:00 p.m.', '3:00 p.m.', '1', 'Puebla Mexico Valsequillo Stake', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 6),
(7, 60, 'English Connect', 2, 'Jueves', 'Domingo', '9:00 p.m.', '5:00 p.m.', '1', 'Cuautla Mexico Zapata Stake', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 7);

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`id`, `name`, `last_name`, `phone`, `email`, `created_at`, `modified_on`, `status`) VALUES
(2, 'Gabriela Isabel', 'Paredes Valle', '5516917809', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active'),
(3, 'Adriana', 'Ortega', '8332882825', 'ady.ortegavm.74@gmail.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active'),
(4, 'Jose Gregorio', 'Dun Rodriguez', '5537369279', 'dunj2001@hotmail.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active'),
(6, 'Leonorilda', 'Corona', '2226574738', 'leo_corona@yahoo.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active'),
(7, 'Olivia', 'Maturano Salazar', '7352213072', 'oli.ms29@gmail.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `course_code` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `last_name`, `email`, `phone`, `course_code`, `course_id`, `created_at`, `modified_on`, `status`) VALUES
(2, 'gabriela', 'mun?oz juarez', '6241577999gabriela@gmail.com', '6241577999', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(3, 'Claudia', 'Rodri?guez Romero', 'clau_rodrig@hotmail.com', '5542600894', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(4, 'Kary', 'Magdaleno', 'kary.magon@gmail.com', '5532299821', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(5, 'Dayanne scarleth', 'Mendoza Mendoza', 'Elisanatalymendozatercero@gmail.com', '9612523924', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(6, 'Liam Jacob', 'Go?mez Esquivel', 'taniamassielg121@gmail.com', '7751346541', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(7, 'Emilia Alejandra', 'Mene?ndez Martinez', 'menendezale154@gmail.com', '5517779989', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(8, 'Mario Alberto', 'Wilson Marti?nez', 'mariowilson@live.com.mx', '5549118731', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(9, 'Sonia Martina', 'Miranda Ojeda', 'mirandita.yop@gmail.com', '6563376505', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(10, 'Karla Andrea', 'Porras Garci?a', 'andreaporrasgarcia@gmail.com', '5539002737', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(11, 'Helena zoi', 'Yeladaky Zink', 'heleg72@gmail.com', '7291095414', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(12, 'Vero?nica', 'Lo?pez Arias', 'lopezarias@hotmail.com', '8333107917', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(13, 'Xiuhtzal', 'Lozano Gomez', 'xiulozanogomez@gmail.com', '5570507913', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(14, 'Sarai', 'Lule', 'pynkwth_7782@hotmail.com', '5544970710', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(15, 'Keylla Nahomi', 'Molina Cruz', 'cheslayAksana@gmail.com', '9611195824', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(16, 'Marcos Merquiades', 'Paredes Fiestas', 'marcosng10@gmail.com', '5532304656', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(17, 'Leonardo', 'Valdovinos Santiago', 'leonardovaldovinossan11@gmail.com', '9671489939', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(18, 'Jorge Alberto', 'Ferral Morgado', 'ferraljo@hotmail.com', '5.29671E+11', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(19, 'Silvia Nayelli', 'Marti?nez Montan?o', 'nutsan.np@gmail.com', '2441140857', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(20, 'Ruth', 'Arredondo', 'arredondoruth29@gmail.com', '9513957050', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(21, 'Victor Hakim', 'Popoca Martinez', 'nutsan.np@gmail.com', '2441140857', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(22, 'Viridiana', 'Sanchez Ascencio', 'viri_ascencio@live.com', '5554326514', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(23, 'viridian', 'sanchez ascencio', 'viridiana.sanchez@spdm.mx', '5554326514', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(24, 'Rusell Spencer', 'Rivera Sanchez', 'spencer.sanz23@gmail.com', '8333500708', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(25, 'Yocelin', 'Colin Alvarado', 'yocelincolina30@gmail.com', '5574804822', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(26, 'Nelly', 'Viale de Paredes', 'nellyta_viale@hotmail.com', '5527582902', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(27, 'Rebeca', 'Salazar Go?mez', 'ireri.salazar@gmail.com', '5587949987', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(28, 'Consuelo', 'Gomez', 'chelo13497@hotmail.com', '9711000274', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(29, 'Emily Margaret', 'Olvera Meji?a', 'emi.lekmon03@gmail.com', '7731494287', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(30, 'Anel', 'Meji?a Torres', 'amulek0318@gmail.com', '7731392805', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(31, 'Zoe Odin', 'Lozano Rami?rez', 'zoe.odin.26@live.com', '5570504446', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(32, 'Diana kristhian', 'Lechuga Donis', 'diakrisletuce@gmail.com', '8117630467', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(33, 'Gricelda', 'Gutie?rrez Vicente', 'grisgutierrez.ggv@gmail.com', '9711741027', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(34, 'Xinary Elizabeth', 'Moreno loaiza', 'hehetmaat@gmail.com', '7713568807', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(35, 'Derek Isai', 'Lozano Ramirez', 'deuzramloz0216@gmail.com', '5525559551', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(36, 'Silvia Nayelli', 'Marti?nez Montan?o', 'nutsan.np@gmail.com', '2441140857', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(37, 'Lizeth Alejandra', 'Lo?pez Garci?a', 'liz.eeth230798@gmail.com', '5532942002', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(38, 'Daniela', 'Herna?ndez Mendoza', 'hernandez.md123@gmail.com', '7731442068', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(39, 'Lourdes', 'Heredia', 'heredia_covarrubias@hotmail.com', '8342090737', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(40, 'Mariengel', 'Go?mez Lo?pez', 'gmariengel@gmail.com', '5587041096', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(41, 'Alan', 'Ruiz Ascanio', 'arte.ara7@gmail.com', '5616743563', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(42, 'Adela', 'Pe?rez Cruz', 'aperuz1985@gmail.com', '5554948421', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(43, 'Blanca', 'Sa?nchez', 'bcano0016@gmail.com', '8333006003', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(44, 'Danna Jasmin', 'Marti?nez Tlapaltotoli', 'dannamtzjasmin22@gmail.com', '2211494427', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(45, 'Erin Rebeca', 'Victorio Fabila', 'rebevifa@gmail.com', '9991525863', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(46, 'Sebastia?n', 'Victorio Fabila', 'holasoysebasvf@gmail.com', '9991719154', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(47, 'Jose? A?ngel', 'Blanco Reyes', 'angel_blancor@consultant.com', '5556319657', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(48, 'Dalila', 'Lo?pez Simo?n', 'dali2losi@gmail.com', '7731141569', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(49, 'Maria Teresa', 'Donis Lo?pez', 'terelechuga2009@hotmail.com', '5611219829', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(50, 'Lucero', 'Soriano Pe?rez', 'lucerosorianoperez@gmail.com', '5585922706', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(51, 'Luis oscar', 'Morales', 'luisoscarmoralesrodriguez@hotmail.com', '6611075357', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(52, 'Ericka', 'Perez Resendiz', 'ericka.vazquez99@hotmail.com', '5579653913', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(53, 'Blanca Virginia', 'Guerrero Campuzano', 'blankaazul30@gmail.com', '5623872499', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(54, 'Salvador', 'Leo?n Cortez', 'chavaleoncortez@gmail.com', '4423338822', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(55, 'Karina', 'Ruiz ruiz', 'karinaruizruiz196@gmail.com', '4421064015', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(56, 'Irma L', 'Davalos', 'dreamer_69@hotmail.es', '5551490283', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(57, 'Mari?a Cristina', 'Quintero Mota', 'cristiqm01@gmail.com', '5578089323', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(58, 'Joaquin', 'Carrasco Ramirez', 'joaquin_yiyo_carrasco@hotmail.com', '5533515549', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(59, 'Eduardo Jero?nimo', 'Garci?a Villalpando', 'edwardj1970@hotmail.com', '5586983232', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(60, 'Hilario', 'Netzahuatl Pe?rez', 'grhse39@gmail.com', '2447864458', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(61, 'Ivonne', 'Maldonado Montoya', 'bonnymoon13@yahoo.com.mx', '5517980315', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(62, 'Keira Elanor', 'Pe?rez Romero', 'keiraepr@gmail.com', '2441885071', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(63, 'Annia Lish', 'Pe?rez Romero', 'anishperezromero@gmail.com', '2441305973', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(64, 'Celarent', 'Ruiz Pimentel', 'rpcelarent@gmail.com', '5514841569', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(65, 'Teresita Yareth', 'Gonza?lez Torres', 'yarani100@gmail.com', '5576964774', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(66, 'Miguel', 'Flores', 'miguel_fsj@hotmail.com', '2224814282', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(67, 'Mayra', 'Jime?nez Monzo?n', 'mayrajimenez19283@gmail.com', '9621101227', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(68, 'Antonio', 'Gonza?lez Guerrero', 'agonzalez@wireco.com', '5534553223', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(69, 'Samuel', 'Torres Rivera', 'samuel5mastershift@gmail.com', '8112580931', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(70, 'Aldo Giobani', 'Olvera Pen?a', 'NEPHI_86@HOTMAIL.COM', '7772275150', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(71, 'Mary', 'Pe?rez Herna?ndez', 'tutymphsud.01@gmail.com', '5559605638', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(72, 'Xochitl Sarahi', 'Cifuentes Aranda', 'cifus33@gmail.com', '5526188583', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(73, 'Marcel', 'Sanchez Arellano', 'marcel2979@gmail.com', '3322778208', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(74, 'Brandy de jesus antonio', 'mijangos hernandez', 'brandymijangoshernandez@gmail.com', '9515193130', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(75, 'Rebeca', 'Salas Zacarias', 'vecka.ww.74@hotmail.com', '5587806947', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(76, 'Miriam Eloina', 'Castro Vega', 'miriamcastro1507@gmail.com', '6621649339', 22, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(77, 'Pricila Betsaida', 'Normandia Torres', 'priss.peque.more@gmail.com', '7775322521', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(78, 'Ma Eugenia', 'Birrueta', 'marukita53@hotmail.com', '9982638467', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(79, 'Adriana Maribel', 'Hernandez Moreno', 'amhm101@outlook.com', '8334310679', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(80, 'Rosalba', 'Garci?a Lo?pez', 'roslabagl2021@gmail.com', '2761162622', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(81, 'Ma del Carmen', 'Ma?rquez Rami?rez', 'centrodacorto10@gmail.com', '5561527649', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(82, 'Eloisa', 'Aguilar Torres', 'kosmos.eat@gmail.com', '5538013860', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(83, 'Adriana', 'Del Ri?o Limones', 'hadayellow@gmail.com', '8714834869', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(84, 'Alan', 'Obrego?n Cero?n', 'alanpeka166@gmail.com', '7731151795', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(85, 'Elvia Mari?a', 'Santiago Arellano', 'arellanoelviamaria@gmail.com', '2282521527', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(86, 'Pablo Alan', 'Cordero Marti?nez', 'pabloalancormar@gmail.com', '6462013370', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(87, 'William', 'Ramirez', 'warramirez198@gmail.com', '50587459420', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(88, 'rosalba', 'dominguez', 'marila21216@gmail.com', '2311387706', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(89, 'kevin', 'hernandez', 'marila21216@gmail.com', '2313196887', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(90, 'Jaqueline', 'Guzman', 'jaque_line5@hotmail.es', '5624537886', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(91, 'omar', 'sanchez', 'omar.sanchez.santiago.84@gmail.com', '7732006844', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(92, 'Irissol', 'Arellano Lara', 'irisarela13@gmail.com', '2282330680', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(93, 'Michelle', 'Rami?rez Cabrices', 'michelle-dariana@hotmail.com', '5.73015E+11', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(94, 'Jeraymir', 'Izquierdo', 'jeraymir@gmail.com', '8781224637', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(95, 'Alicia Guadalupe', 'Gonza?lez Ortega', 'aggortega84@gmail.com', '7228647706', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(96, 'Samuel', 'Rodriguez', 'ssandrax@yahoo.com.mx', '8134059067', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(97, 'Maria Luisa', 'Trejo Reyes', 'maritrejo55@hotmail.com', '5615183632', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(98, 'Azael', 'Melquiadez Ceron', 'analyazael@gmail.com', '7731213681', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(99, 'Maribel', 'Seden?o Gonza?lez', 'maribelasedeno76@gmail.com', '7351836343', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(100, 'Wendy', 'Domi?nguez', 'wendy_paw@hotmail.com', '6361048812', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(101, 'Joel', 'Paternina S.', 'joelpaternina3@gmail.com', '(507) 63180056', 32, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(102, 'Nohemi', 'De La Rosa Espiritu', 'nofthepink@gmail.com', '2761173324', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(103, 'Yunuen Esmeralda', 'Sa?nchez Xicali', 'yunuenxicali@gmail.com', '2225491019', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(104, 'Marissa', 'Agramon de Gomez', 'marssa_81@hotmail.com', '6671830586', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(105, 'Sebastian', 'Espinosa Ocampo', 'malwer677@gmail.com', '7221023874', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(106, 'Ximena', 'Rami?rez Diaz', 'xramirez051@gmail.com', '5584783008', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(107, 'Helaman', 'Perez', 'helamanperezramirez@gmail.com', '2211538897', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(108, 'Elvia', 'Flores Granados', 'elvflores@hotmail.com', '4423891724', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(109, 'jessica', 'guillen', 'jl.guillen@ebc.edu.mx', '15576667452', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(110, 'Nadyeli Guadalupe', 'Spezzia Sotelo', 'naashspezzia@gmail.com', '2441505235', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(111, 'Laura Viridiana', 'Ocegueda Vargas', 'laurita0375@gmail.com', '5617251932', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(112, 'Melissa iveth', 'Islas tenorio', 'melitaiste@gmail.com', '5548668526', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(113, 'Leticia', 'Tenorio Dominguez', 'letiteno24@gmail.com', '5573735881', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(114, 'Cynthia Mayela', 'Torres Granados', 'maye.grana2@gmail.com', '8110042542', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(115, 'Daniel Enrique', 'Silva Cruz', 'silvdaniel0905@gmail.com', '2216429054', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(116, 'Naomi', 'Ramirez', 'kjoo40787@gmail.com', '7561064047', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(117, 'Luis Eduardo', 'Santiago Arellano', 'arteagaechegaray@gmail.com', '2284001626', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(118, 'Dante', 'Rodriguez', 'shelemmar@gmail.com', '9981307637', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(119, 'Mi?riam Edith', 'Carmona Villegas', 'mgpo.idumedia@gmail.com', '7223819674', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(120, 'Melesio', 'Herrera Vargas', 'melesioher57@gmail.com', '22 23440035', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(121, 'Yanet', 'Rojas', 'yanetrojas3b@gmail.com', '7029829243', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(122, 'Susan', 'Carrera Carrillo', 'naomis17carrillo@gmail.com', '4941043806', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(123, 'Reyna Isabel', 'Dominguez Gaytan', 'dominguezreyna688@gmail.com', '9512118887', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(124, 'Amauri David', 'Bautista Lo?pez', 'vickilop1972@gmail.com', '9515773123', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(125, 'Patricia del Carmen', 'Carvajal Ramos', 'kayashy@hotmail.com', '9612507870', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(126, 'Judith', 'Lo?pez Salas', 'jlopez102@hotmail.com', '5527557653', 39, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(127, 'Claudia Yaribeth', 'Ganzo Lara', 'claudiayaribethganzolara@gmail.com', '9631666974', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(128, 'Mayra', 'Jime?nez Monzo?n', 'mayrajimenez19283@gmail.com', '9621101227', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(129, 'Hyrum Jeshua', 'Hernandez Perea', 'chotecello@gmail.com', '4921215658', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(130, 'Dulce Alicia', 'Herna?ndez Domi?nguez', 'dulcehdzdguez@gmail.com', '8468992705', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(131, 'julio', 'ortiz barboza', 'job8_07@hotmail.com', '8713420998', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(132, 'Marisol', 'Rivera Del Villar', 'mar.sol.delvillar@gmail.com', '4433731909', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(133, 'Ibis Oliblish', 'Mariscal Ang', 'ibismariscal.25@gmail.com', '3334790103', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(134, 'Najely Marjorie', 'Castro Alonzo', 'ncastroalonzo01@gmail.com', '976019037', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(135, 'Andrea Jacqueline', 'Kunz Salgado', 'andrea.kunz97@gmail.com', '5.42994E+11', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(136, 'Fernando', 'Flo?rez Borja', 'ferrafflorez@gmail.com', '5.84266E+11', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(137, 'Erwin', 'Menchu', 'alejandromenchu066@gmail.com', '50246871137', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(138, 'Brander', 'Bucio', 'Branderr2019@outlook.com', '8342525230', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(139, 'Rohan', 'Bucio Flores', 'bucioflores15@gmail.com', '8341161642', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(140, 'Abish Aylen', 'Salazar Chavez', 'abishaylen@gmail.com', '7352687868', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(141, 'Vianey', 'Parra Cuevas', 'vianeyparra123@gmail.com', '9992688907', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(142, 'Estefany', 'Fernandez', 'fernandezestefany79@gmail.com', '7841371556', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(143, 'Carlos Alberto', 'Contreras Lara', 'llatrileon@hotmail.com', '9211738700', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(144, 'NORA LETICIA', 'salazar', 'noraleticiaguizadosalazar15@gmail.com', '7351671446', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(145, 'Diego', 'Fonseca Arcos', 'diegofonsecaarcos1@gmail.com', '5575650921', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(146, 'Ixchel', 'Garci?a', 'ixchel8ade@gmail.com', '2818709834', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(147, 'Esteffany', 'Leo?n', 'leonesteffany@gmail.com', '5542283148', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(148, 'Jairo', 'Herna?ndez', 'leonesteffany@gmail.com', '5511485800', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(149, 'Moises Isai', 'Salazar Chavez', 'moysalazar2004@gmail.com', '7352642654', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(150, 'Alexis Michelle', 'Ortiz Rojas', 'rojasamorblue1@hotmail.com', '4921043186', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(151, 'Anahi', 'Dario', 'anahidario@gmail.com', '3442', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(152, 'Nayeli Sinthia', 'Capcha Barrios', 'sinthiacapcha@gmail.com', '+51 971631262', 60, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `instructor`
--
ALTER TABLE `instructor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
