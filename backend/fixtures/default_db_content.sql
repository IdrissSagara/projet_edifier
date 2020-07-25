-- Clients
INSERT INTO `Clients` (`id`, `nom`, `prenom`, `telephone`, `createdAt`, `updatedAt`) VALUES
(1, 'unNom', 'unPrenom', '00000001', '2019-12-29 00:34:37', '2019-12-29 00:34:37'),
(2, 'Doumbia', 'Madou', '0000', '2019-12-29 20:52:51', '2019-12-29 20:52:51'),
(5, 'unNom', '6757', '000090001', '2020-01-11 19:58:11', '2020-01-11 19:58:11'),
(6, 'from', 'nom', '00000022113', '2020-01-21 19:19:53', '2020-01-21 19:19:53');

-- Chantiers
INSERT INTO `Chantiers` (`id`, `clientId`, `emplacement`, `cout`, `date_debut`, `date_fin`, `walita`, `yereta`, `montant_dispo`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'faladie', 123000, '2019-11-11 23:00:00', NULL, 0, 123000, 123000, '2019-12-29 00:39:58', '2019-12-29 00:39:58'),
(3, 2, 'boul city', 323000, '2019-12-31 23:00:00', NULL, 0, 323000, 323000, '2019-12-30 02:08:04', '2020-01-01 00:19:32'),
(4, 2, 'boul city', 323000, '2019-12-20 23:00:00', NULL, 0, 323000, 323000, '2019-12-30 02:10:42', '2019-12-30 02:10:42'),
(5, 1, 'moribabg', 123000, '2020-10-31 23:00:00', NULL, 0, 123000, 123000, '2020-01-01 13:44:16', '2020-01-01 13:44:16');


-- Users
INSERT INTO `Users` (`id`, `nom`, `prenom`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', 'admin', '$2b$07$Ag6shPE6X1Qj.nKfhJmh2eEt8p3jKZNWmrbG4wLxG52H6ftg4uWIm', 'admin', '2020-01-01 02:07:00', '2020-01-01 02:07:00'),
(2, 'admin2', 'admin2', 'admin2', '$2b$07$NyPgKe8pIAOhe/CiA7Kq9.2w/APZ.HEnkNQRCpUsLe1XuPxNpCwbe', 'admin', '2020-01-12 13:24:47', '2020-01-12 13:24:47'),
(3, 'Coulou', 'Kadi', 'kadicoul', '$2b$07$zCV5vicVhG4r9BJLU2DBHeq/kIrsqKbiBamqDmim6L7qozXna1.z6', 'basic-user', '2020-01-12 13:38:11', '2020-01-12 13:38:11');


