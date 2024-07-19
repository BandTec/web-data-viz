-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local
*/

create database exemplo_upload;
use exemplo_upload;

create table usuario (
  id int primary key auto_increment,
  nome varchar(45),
  email varchar(45),
  imagem_perfil varchar(255)
)