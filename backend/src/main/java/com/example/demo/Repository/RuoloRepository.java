package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Ruolo;

@Repository
public interface RuoloRepository extends JpaRepository<Ruolo, Long> {

    Ruolo findRuoloByNome(String nome);
}



