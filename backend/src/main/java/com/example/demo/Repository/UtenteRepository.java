package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Utente;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Long> {

}
