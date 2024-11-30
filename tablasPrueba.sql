-- -------------------------------------------------------------
-- TablePlus 3.11.0(352)
--
-- https://tableplus.com/
--
-- Database: electricFinder
-- Generation Time: 2024-06-01 16:57:28.4550
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `tieneFoto` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `ubicacion`, `tieneFoto`, `password`) VALUES
('1', 'Juan', 'Pérez', 'juan@example.com', 'Ciudad de México, México', '0', 'contraseña123'),
('2', 'María', 'García', 'maria@example.com', 'Madrid, España', '1', 'clave123'),
('3', 'Luis', 'Hernández', 'luis@example.com', 'Buenos Aires, Argentina', '0', 'password123'),
('4', 'Ana', 'Martínez', 'ana@example.com', 'Lima, Perú', '0', 'contraseña123'),
('5', 'Carlos', 'Rodríguez', 'carlos@example.com', 'Bogotá, Colombia', '1', 'clave123'),
('6', 'Laura', 'López', 'laura@example.com', 'Santiago, Chile', '0', 'password123'),
('7', 'David', 'Gómez', 'david@example.com', 'Quito, Ecuador', '0', 'contraseña123'),
('8', 'Elena', 'Díaz', 'elena@example.com', 'São Paulo, Brasil', '1', 'clave123'),
('9', 'Sara', 'Ruiz', 'sara@example.com', 'Lisboa, Portugal', '0', 'password123'),
('10', 'Diego', 'Fernández', 'diego@example.com', 'Barcelona, España', '0', 'contraseña123'),
('25', 'Elena', 'Díaz', 'elena@example.com', 'São Paulo, Brasil', '1', 'clave123'),
('26', 'Sara', 'Ruiz', 'sara@example.com', 'Lisboa, Portugal', '0', 'password123'),
('28', 'Eduardo', 'Norriega', 'eduardo@eduardo.es', 'Buendía, Cuenca', '0', 'asdcdzcs'),
('29', 'ejemplo', 'example', 'example@example.com', 'madrid', '0', '1234');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;




CREATE TABLE `electricistas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `servicios` varchar(255) NOT NULL,
  `nombreEmpresa` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `secondary` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `electricistas` (`id`, `nombre`, `apellidos`, `telefono`, `email`, `ubicacion`, `servicios`, `nombreEmpresa`, `password`) VALUES
('1', 'Pablos', 'González', '123456789', 'pablo@example.com', 'Huete, Cuenca', 'Instalación eléctrica, Reparación de cortocircuitos', 'Electricidad González', 'password123'),
('2', 'Alejandro', 'Sánchez', '987654321', 'alejandro@example.com', 'Madrid, España', 'Mantenimiento de sistemas eléctricos, Instalación de iluminación', 'Sánchez Electrificaciones', 'clave123'),
('3', 'Daniel', 'Pérez', '5551234567', 'daniel@example.com', 'Buendía, Cuenca', 'Instalación de paneles solares, Reparación de fallos eléctricos', 'Pérez Energía Renovable', 'contraseña123'),
('4', 'Eduardo', 'Martínez', '7779876543', 'eduardo@example.com', 'Málaga, España', 'Instalación de sistemas de seguridad eléctrica, Cableado residencial', 'Martínez Electricidad', 'password123'),
('5', 'Sofía', 'López', '3334445556', 'sofia@example.com', 'Sacedón, Guadalajara', 'Reparación de electrodomésticos, Instalación de alarmas', 'Sofía Electric', 'clave123'),
('6', 'Manuel', 'Gómez', '6667778889', 'manuel@example.com', 'Leganés, Madrid', 'Mantenimiento de sistemas de iluminación, Reparación de circuitos eléctricos', 'Gómez Electric', 'contraseña123'),
('7', 'Carmen', 'Fernández', '2223334447', 'carmen@example.com', 'Sagunto, Valencia', 'Instalación de sistemas de energía alternativa, Reparación de transformadores', 'Carmen Energías Renovables', 'password123'),
('8', 'Javier', 'Pérez', '9998887775', 'javier@example.com', 'Chillarón, Guadalajara', 'Instalación de sistemas de tierra, Mantenimiento.Cambio cableado integral', 'Electricidad Pérez', 'clave123'),
('10', 'Mario', 'García', '1231231234', 'mario@example1.com', 'Barcelona, España', 'Instalación de sistemas de domótica, Reparación de sistemas de seguridad electrónica', 'Mario Electric', 'password123'),
('45', 'Elena', 'Ruiz', '1112223338', 'elenas@example.com', 'Carratraca, Málaga', 'Reparación de sistemas de climatización, Instalación de sistemas de control de acceso', 'Ruiz Energía', 'contraseña123'),
('46', 'Damian', 'Vazquez', '1334535343', 'damian@prueba.es', 'Tendilla, Cuenca', 'Electricidad para tu hogar', 'Damian SA', 'q32ewe');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;







-- -------------------------------------------------------------
-- TablePlus 3.11.0(352)
--
-- https://tableplus.com/
--
-- Database: electricFinder
-- Generation Time: 2024-06-01 16:57:42.4040
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `valoraciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_electricista` int NOT NULL,
  `id_usuario` int NOT NULL,
  `puntuacion` int NOT NULL,
  `comentario` text,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_electricista` (`id_electricista`),
  KEY `id_usuario` (`id_usuario`) USING BTREE,
  CONSTRAINT `valoraciones_ibfk_1` FOREIGN KEY (`id_electricista`) REFERENCES `electricistas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `valoraciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `valoraciones` (`id`, `id_electricista`, `id_usuario`, `puntuacion`, `comentario`, `fecha`) VALUES
('13', '1', '1', '5', 'Excelente trabajo, muy profesional.', '2024-04-24 20:18:45'),
('14', '2', '2', '4', 'Buen servicio, llegó a tiempo.', '2024-04-24 20:18:45'),
('15', '3', '3', '3', 'Regular, tardó un poco en solucionar el problema.', '2024-04-24 20:18:45'),
('16', '4', '4', '5', 'Muy amable y eficiente, lo recomendaría.', '2024-04-24 20:18:45'),
('17', '5', '5', '2', 'No quedé satisfecho con el trabajo realizado.', '2024-04-24 20:18:45'),
('18', '6', '6', '4', 'Todo perfecto, volveré a contratarlo en el futuro.', '2024-04-24 20:18:45'),
('19', '7', '7', '5', 'Gran trabajo, resolvió el problema rápidamente.', '2024-04-24 20:18:45'),
('20', '8', '8', '3', 'Correcto, pero hubo un pequeño retraso en el inicio.', '2024-04-24 20:18:45'),
('23', '2', '3', '3', 'Buen servicio, aunque algo caro.', '2024-04-24 20:18:45'),
('24', '2', '4', '5', 'Buen servicio, muy amable y profesional.', '2024-04-24 20:18:45'),
('25', '3', '1', '4', 'Rápido y eficiente, lo recomendaría.', '2024-04-24 20:18:45'),
('26', '3', '2', '5', 'Excelente trabajo, resolvió el problema.', '2024-04-24 20:18:45'),
('27', '4', '5', '4', 'Muy profesional, explicó todo detalladamente.', '2024-04-24 20:18:45'),
('28', '4', '6', '3', 'Buen servicio, pero hubo un pequeño retraso.', '2024-04-24 20:18:45');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;