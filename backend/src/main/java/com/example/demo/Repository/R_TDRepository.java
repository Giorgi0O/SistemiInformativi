package com.example.demo.Repository;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.TurnoLavorativo;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.R_TD;

import java.util.Date;
import java.util.List;

@Repository
public interface R_TDRepository extends JpaRepository<R_TD, Long> {

    List<R_TD> findR_TDByDipendente(Dipendente d);


    List<R_TD> findByturnoLavorativoDate(Date d);

}

