

criando banco 

CREATE DATABASE IF NOT EXISTS boscov_db;
USE boscov_db;


criando tabelas e populando

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: boscov_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('18226d19-e0fe-4bc7-bab4-a6bee0839e0b','591c5b4df4a41a9bacc67a07e54ad0c4772134d27587e3f9f4aea0aaab0db563','2025-04-06 12:55:47.340','20250406125546_ajuste_modelo_usuario',NULL,NULL,'2025-04-06 12:55:46.657',1),('21cb9a8c-fcb9-4f23-84e2-d046ff2dd684','283f518b58a696b65727998614be0c8cb7680c3405bd7446b52e962930a54f9e','2025-04-05 12:36:57.959','20250405123657_init',NULL,NULL,'2025-04-05 12:36:57.809',1),('2ad830b9-e66b-4a52-8d77-770b2c0521a8','ebb31958846e8f522f1c72288d73b488735ee80278db1be44177a53901fee3f9','2025-04-07 13:04:34.327','20250407130434_add_status_to_genero',NULL,NULL,'2025-04-07 13:04:34.234',1),('483c68bc-b7a8-4bcb-9faf-93cd3113b25b','82d60ab23ae430c6c833390bb055ec1a53cfe40e5bf6941d39394bdada055428','2025-04-07 11:10:30.884','20250407111030_add_genero_id_e_sinopse',NULL,NULL,'2025-04-07 11:10:30.680',1),('4df01554-909c-4e01-ab54-0e73b81f489f','c6652b81f1de6cac6841ef69dd8548715f686aac707871522b75a0e69b09b17f','2025-04-07 11:16:08.791','20250407111608_update_genero_obrigatorio',NULL,NULL,'2025-04-07 11:16:08.477',1),('5182186f-1a47-4c80-aa67-b249d618d323','d2a814a44e6cde9e61ec96cb839efaa871f5cf60d881419ad1c6c9c516e87da6','2025-04-05 14:14:11.246','20250405141411_add_ativo_to_user',NULL,NULL,'2025-04-05 14:14:11.185',1),('5dd74421-6458-45ba-88da-343493a3d745','2ecd53720782c4c3f6941fd3dd522af880b32298d43bf509878013b19413e86d','2025-04-07 11:58:04.838','20250407115804_add_status_to_filme',NULL,NULL,'2025-04-07 11:58:04.777',1),('70ead890-ad57-4244-be7c-712180d45f5b','0751484b20da2651a845f2acf43a4f681d7458db6764361312a824a8e48d0e96','2025-04-06 14:11:15.573','20250406141115_add_tipo_usuario_relation',NULL,NULL,'2025-04-06 14:11:15.265',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idFilme` int NOT NULL,
  `nota` int NOT NULL,
  `comentario` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Avaliacao_idUsuario_fkey` (`idUsuario`),
  KEY `Avaliacao_idFilme_fkey` (`idFilme`),
  CONSTRAINT `Avaliacao_idFilme_fkey` FOREIGN KEY (`idFilme`) REFERENCES `filme` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Avaliacao_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (31,1,1,9,'Filme excelente!'),(32,3,2,7,'Muito bom, mas poderia ser mais curto.'),(33,4,3,8,'Ótima atuação do elenco principal.'),(34,5,4,6,'Esperava mais do final.'),(35,1,5,10,'Um dos melhores que já assisti!'),(36,3,6,7,'Interessante, mas com roteiro previsível.'),(37,4,7,5,'Não curti muito o enredo.'),(38,5,8,8,'Boa trilha sonora e direção.'),(39,1,9,9,'Muito emocionante!'),(40,3,10,6,'Legalzinho, dá pra assistir uma vez.'),(41,4,11,9,'Amei os efeitos especiais!'),(42,5,12,8,'Boa história, recomendo.'),(43,1,13,7,'Personagens bem desenvolvidos.'),(44,3,14,6,'Um pouco lento, mas bonito visualmente.'),(45,4,15,10,'Perfeito do início ao fim!'),(46,5,16,5,'Achei confuso.'),(47,1,17,8,'Bom suspense.'),(48,3,18,7,'Gostei bastante!'),(49,4,19,9,'Muito criativo e bem produzido.'),(50,5,20,6,'Não entendi o final.'),(51,1,21,10,'Filme impactante!'),(52,3,22,7,'Trama envolvente.'),(53,4,23,6,'Ok, mas nada de especial.'),(54,5,24,8,'Final surpreendente.'),(55,1,25,9,'Muito divertido!'),(56,3,26,5,'Me decepcionou.'),(57,4,27,8,'Boa escolha para um sábado à noite.'),(58,5,28,7,'Gostei do estilo do diretor.'),(59,1,29,6,'Podia ser melhor.'),(60,3,30,10,'Obra-prima!');
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filme`
--

DROP TABLE IF EXISTS `filme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `diretor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anoLancamento` int NOT NULL,
  `duracao` int NOT NULL,
  `produtora` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `classificacao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poster` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `generoId` int NOT NULL,
  `sinopse` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dataAtualizacao` datetime(3) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `Filme_generoId_fkey` (`generoId`),
  CONSTRAINT `Filme_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `genero` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filme`
--

LOCK TABLES `filme` WRITE;
/*!40000 ALTER TABLE `filme` DISABLE KEYS */;
INSERT INTO `filme` VALUES (1,'Oppenheimer - Edição Final','Christopher Nolan',2023,181,'Universal','16',NULL,1,'Edição final com cenas inéditas.','2025-04-10 14:52:07.955',0),(2,'Risos e Trapalhadas','Todd Phillips',2011,100,'Warner Bros','12 anos','https://exemplo.com/posters/risos.jpg',5,NULL,'2025-04-10 14:52:13.504',0),(3,'O Peso da Vida','Greta Gerwig',2019,125,'A24','14 anos','https://exemplo.com/posters/vida.jpg',8,NULL,'2025-04-10 14:52:18.780',0),(4,'A Sombra da Noite','Jordan Peele',2022,110,'Blumhouse','16 anos','https://exemplo.com/posters/sombra.jpg',19,NULL,'2025-04-10 14:52:22.864',0),(5,'Galáxias em Guerra','George Lucas',1977,121,'Lucasfilm','10 anos','https://exemplo.com/posters/galaxias.jpg',12,NULL,'2025-04-10 14:52:26.665',0),(6,'O Cavaleiro Medieval','Ridley Scott',2005,144,'Paramount','14 anos','https://exemplo.com/posters/cavaleiro.jpg',1,NULL,'2025-04-10 14:52:47.855',0),(7,'Doce Amor','Richard Curtis',2003,130,'Universal','12 anos','https://exemplo.com/posters/amor.jpg',18,NULL,'2025-04-10 14:52:51.420',0),(8,'Corações de Ferro','David Ayer',2014,134,'Sony Pictures','16 anos','https://exemplo.com/posters/guerra.jpg',13,NULL,'2025-04-10 14:52:55.071',0),(9,'Segredos do Tempo','Christopher Nolan',2020,150,'Warner Bros','14 anos','https://exemplo.com/posters/tempo.jpg',15,NULL,'2025-04-10 14:52:59.234',0),(10,'No Mundo da Magia','David Yates',2007,138,'Warner Bros','12 anos','https://exemplo.com/posters/magia.jpg',10,NULL,'2025-04-10 14:53:02.845',0),(11,'Dois Mundos','Andy Wachowski',1999,136,'Warner Bros','16 anos','https://exemplo.com/posters/matrix.jpg',12,NULL,'2025-04-10 14:53:09.731',0),(12,'Diário de uma Bailarina','Darren Aronofsky',2010,108,'Fox Searchlight','14 anos','https://exemplo.com/posters/bailarina.jpg',8,NULL,'2025-04-10 14:53:12.898',0),(13,'Mares Tempestuosos','Peter Weir',2003,138,'Universal','12 anos','https://exemplo.com/posters/mares.jpg',13,NULL,'2025-04-10 14:53:17.609',0),(14,'Velocidade Extrema','Jan de Bont',1994,116,'20th Century Fox','14 anos','https://exemplo.com/posters/velocidade.jpg',1,NULL,'2025-04-10 14:53:21.661',0),(15,'Código Hacker','Michael Mann',2015,133,'Legendary','16 anos','https://exemplo.com/posters/hacker.jpg',6,NULL,'2025-04-10 14:53:26.488',0),(16,'A Última Missão','Clint Eastwood',2008,122,'Warner Bros','16 anos','https://exemplo.com/posters/missao.jpg',17,NULL,'2025-04-10 14:53:29.987',0),(17,'No Ritmo do Amor','Damien Chazelle',2016,128,'Lionsgate','12 anos','https://exemplo.com/posters/ritmo.jpg',16,NULL,'2025-04-10 14:53:33.319',0),(18,'O Vento Levou','Victor Fleming',1939,201,'MGM','Livre','https://exemplo.com/posters/vento.jpg',8,NULL,'2025-04-10 14:53:38.890',0),(19,'A Herança','Ari Aster',2018,127,'A24','18 anos','https://exemplo.com/posters/heranca.jpg',20,NULL,'2025-04-10 14:53:42.259',0),(20,'Espaço Profundo','Denis Villeneuve',2021,155,'Legendary','14 anos','https://exemplo.com/posters/espaco.jpg',12,NULL,'2025-04-10 14:53:46.534',0),(21,'Era do Gelo','Chris Wedge',2002,81,'Blue Sky Studios','Livre','https://exemplo.com/posters/era_gelo.jpg',2,NULL,'2025-04-10 14:53:49.603',0),(22,'Aventura na Selva','Jon Favreau',2016,106,'Disney','Livre','https://exemplo.com/posters/selva.jpg',3,NULL,'2025-04-10 14:53:52.535',0),(23,'Reflexos da Mente','Charlie Kaufman',2020,135,'Netflix','16 anos','https://exemplo.com/posters/reflexos.jpg',15,NULL,'2025-04-10 14:53:55.609',0),(24,'Vidas Cruzadas','Alejandro Iñárritu',2006,142,'Paramount','14 anos','https://exemplo.com/posters/vidas.jpg',8,NULL,'2025-04-10 14:53:58.651',0),(25,'Destino Final','James Wong',2000,98,'New Line Cinema','18 anos','https://exemplo.com/posters/destino.jpg',20,NULL,'2025-04-10 14:54:03.427',0),(26,'Maré Vermelha','Tony Scott',1995,116,'Hollywood Pictures','16 anos','https://exemplo.com/posters/mare.jpg',13,NULL,'2025-04-10 14:54:06.480',0),(27,'Entre Estrelas','Christopher Nolan',2014,169,'Paramount','10 anos','https://exemplo.com/posters/estrelas.jpg',12,NULL,'2025-04-10 14:54:10.309',0),(28,'Cidade dos Anjos','Brad Silberling',1998,114,'Warner Bros','12 anos','https://exemplo.com/posters/anjos.jpg',18,NULL,'2025-04-10 14:54:13.707',0),(29,'Fragmentado','M. Night Shyamalan',2016,117,'Universal','14 anos','https://exemplo.com/posters/fragmentado.jpg',15,NULL,'2025-04-10 14:54:16.860',0),(30,'Animais Fantásticos','David Yates',2016,133,'Warner Bros','12 anos','https://exemplo.com/posters/fantasticos.jpg',10,NULL,'2025-04-10 14:54:23.052',0),(31,'Oppenheimer','Christopher Nolan',2023,180,'Universal Pictures','16','https://linkdoposter.com/poster.jpg',1,'História do criador da bomba atômica.','2025-04-10 14:54:26.771',0),(40,'O Poderoso Chefão','Francis Ford Coppola',1972,175,'Paramount Pictures','18 anos','https://image.tmdb.org/t/p/original/uP46DujkD3nwcisOjz9a0Xw0Knj.jpg',6,NULL,NULL,1),(41,'Titanic','James Cameron',1997,194,'20th Century Fox','12 anos','https://image.tmdb.org/t/p/original/MlnPG3oxhfmuiDwcoeElQWui9m.jpg',18,NULL,NULL,1),(42,'Interestelar','Christopher Nolan',2014,169,'Paramount Pictures','10 anos','https://image.tmdb.org/t/p/original/p6wYy2mUsOwi4TalNAk46ft4sVJ.jpg',12,NULL,NULL,1),(43,'Vingadores: Ultimato','Anthony e Joe Russo',2019,181,'Marvel Studios','12 anos','https://image.tmdb.org/t/p/original/4QCLUbCsOTvBq4iuvxG1I74XVoS.jpg',30,NULL,NULL,1),(44,'Coringa','Todd Phillips',2019,122,'Warner Bros.','16 anos','https://image.tmdb.org/t/p/original/tBvR4eJGb81CYYpc6uWrJMkLwd1.jpg',8,NULL,NULL,1),(45,'Parasita','Bong Joon-ho',2019,132,'CJ Entertainment','16 anos','https://image.tmdb.org/t/p/original/pV2PVFWHUuX3LZ83DhNXKAjyqY4.jpg',8,NULL,NULL,1),(46,'Forrest Gump','Robert Zemeckis',1994,142,'Paramount Pictures','12 anos','https://image.tmdb.org/t/p/original/lsn4YWMiwkN0Ijsj2oE81OmODFA.jpg',8,NULL,NULL,1),(47,'A Origem','Christopher Nolan',2010,148,'Warner Bros.','14 anos','https://image.tmdb.org/t/p/original/4VWZyyUTuOZGcamFWfdo9EccuQJ.jpg',12,NULL,NULL,1),(48,'Gladiador','Ridley Scott',2000,155,'DreamWorks Pictures','16 anos','https://image.tmdb.org/t/p/original/r1CesMGmV4EKauh5c7PtXBjWBZj.jpg',28,NULL,NULL,1),(49,'Homem-Aranha: Sem Volta Para Casa','Jon Watts',2021,148,'Sony Pictures','12 anos','https://image.tmdb.org/t/p/original/xn5l5fdj158192a7E73A25EdBS0.jpg',30,NULL,NULL,1);
/*!40000 ALTER TABLE `filme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'Ação',1),(2,'Animação',1),(3,'Aventura',1),(4,'Biografia',1),(5,'Comédia',1),(6,'Crime',1),(7,'Documentário',1),(8,'Drama',1),(9,'Família',1),(10,'Fantasia',1),(11,'Faroeste',1),(12,'Ficção Científica',1),(13,'Guerra',1),(14,'História',1),(15,'Mistério',1),(16,'Musical',1),(17,'Policial',1),(18,'Romance',1),(19,'Suspense',1),(20,'Terror',1),(21,'Esporte',1),(22,'Reality Show',1),(23,'Talk Show',1),(24,'Curta-metragem',1),(25,'Cinema Experimental',1),(26,'Film Noir',1),(27,'Live-Action',1),(28,'Épico',1),(29,'Religioso',1),(30,'Super-Herói',1),(31,'Ação',1),(32,'Animação',1),(33,'Aventura',1),(34,'Biografia',1),(35,'Comédia',1),(36,'Crime',1),(37,'Documentário',1),(38,'Drama',1),(39,'Família',1),(40,'Fantasia',1),(41,'Faroeste',1),(42,'Ficção Científica',1),(43,'Guerra',1),(44,'História',1),(45,'Mistério',1),(46,'Musical',1),(47,'Policial',1),(48,'Romance',1),(49,'Suspense',1),(50,'Terror',1),(51,'Esporte',1),(52,'Reality Show',1),(53,'Talk Show',1),(54,'Curta-metragem',1),(55,'Cinema Experimental',1),(56,'Film Noir',1),(57,'Live-Action',1),(58,'Épico',1),(59,'Religioso',1),(60,'Super-Herói',1);
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero_filme`
--

DROP TABLE IF EXISTS `genero_filme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero_filme` (
  `idGenero` int NOT NULL,
  `idFilme` int NOT NULL,
  PRIMARY KEY (`idGenero`,`idFilme`),
  KEY `Genero_Filme_idFilme_fkey` (`idFilme`),
  CONSTRAINT `Genero_Filme_idFilme_fkey` FOREIGN KEY (`idFilme`) REFERENCES `filme` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Genero_Filme_idGenero_fkey` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero_filme`
--

LOCK TABLES `genero_filme` WRITE;
/*!40000 ALTER TABLE `genero_filme` DISABLE KEYS */;
INSERT INTO `genero_filme` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30);
/*!40000 ALTER TABLE `genero_filme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'admin'),(2,'comum');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `apelido` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dataNascimento` datetime(3) NOT NULL,
  `dataCriacao` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dataAtualizacao` datetime(3) NOT NULL,
  `tipoUsuarioId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Usuario_email_key` (`email`),
  KEY `Usuario_tipoUsuarioId_fkey` (`tipoUsuarioId`),
  CONSTRAINT `Usuario_tipoUsuarioId_fkey` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `tipousuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'João Silva','123456','joao.novo@email.com',1,'jsilva','1990-05-10 00:00:00.000','2025-04-06 14:43:49.219','2025-04-06 14:46:05.586',1),(2,'José Silva','123456','josé@example.com',0,'jsilva','1990-05-10 00:00:00.000','2025-04-06 14:44:26.587','2025-04-06 14:46:13.447',1),(3,'Fabiana Silva','123456','fabiana@example.com',1,'fabi','1990-05-10 00:00:00.000','2025-04-06 14:44:41.962','2025-04-06 14:44:41.962',1),(4,'Fernando Silva','123456','fernando@example.com',1,'dede','1990-05-10 00:00:00.000','2025-04-06 14:45:03.472','2025-04-06 14:45:03.472',2),(5,'William Silva','123456','willo@example.com',1,'will','1990-05-10 00:00:00.000','2025-04-06 14:45:19.580','2025-04-06 14:45:19.580',2),(6,'Maria Oliveira','senha123','maria@gmail.com',1,'mariao','1995-07-20 00:00:00.000','2025-04-07 16:15:41.927','2025-04-07 16:15:41.927',1),(9,'Muriel Oliveira','$2b$10$KLo/c4x/M6b8bxg3.B.2AuZj/7ehYX.CVZNBJgFidINye/F71LLGy','muriel@gmail.com',1,'mariao','1995-07-20 00:00:00.000','2025-04-07 17:41:05.544','2025-04-07 17:41:05.544',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'boscov_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10 12:32:31






        