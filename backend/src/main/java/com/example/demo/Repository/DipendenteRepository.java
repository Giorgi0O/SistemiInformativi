package com.example.demo.Repository;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Entity.Ruolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Dipendente;

import java.util.List;

@Repository
public interface DipendenteRepository extends JpaRepository<Dipendente, Long> {

    List<Dipendente> findDipendenteByNome(String nome);
    List<Dipendente> findDipendenteByCognome(String cognome);

    List<Dipendente> findDipendenteByContrattoLavorativo(ContrattoLavorativo contrattoLavorativo);

    List<Dipendente> findDipendenteByRuolo(Ruolo ruolo);

}
