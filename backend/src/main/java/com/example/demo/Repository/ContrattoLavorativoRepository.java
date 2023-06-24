package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.ContrattoLavorativo;

import java.util.List;

@Repository
public interface ContrattoLavorativoRepository extends JpaRepository<ContrattoLavorativo, Long> {

    List<ContrattoLavorativo> findContrattoLavorativoByTipologia(String tipologia);

}
