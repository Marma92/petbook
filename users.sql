-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 13 Juillet 2016 à 15:02
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `petbook`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'dorine', '$2a$10$Rn3/6zAdc7Zm98wm1UIVGuWMoJ87QCJkQa8qnafLs4XyBv0WZNWcK'),
(2, 'do', '$2a$10$HYfnAs/Ns.QesSpmXDAePuwF.qC4rVPzZ42XMJroHo276x6.ELDYK'),
(3, 'test', '$2a$10$Y0l2Q7A5JmMQKFZXitRKruCaCmMraLSKSLjyY1v7CyWsuqIlFFaCy'),
(4, 'amram', '$2a$10$fzedWuU9088k8PsRq7bH/.8LFMktTOUuXvLikb.mfr1wyoSuoCpzy'),
(5, 'azo', '$2a$10$zx0smTf9iIMpQ0lpwaB9me9rcNi0YxHNLvujadXwIs8bV9hy9ZEyG'),
(6, 'loic', '$2a$10$A5QcyIObFEQCk6xiDwP0Y.dOfXUtAHjoHIR1yPujzx9/IiUjxzyOK');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
