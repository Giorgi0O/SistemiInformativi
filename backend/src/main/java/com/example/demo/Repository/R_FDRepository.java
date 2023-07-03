package com.example.demo.Repository;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.R_FD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface R_FDRepository extends JpaRepository<R_FD, Long>  {
    List<R_FD> findByData(Date d);

    List<R_FD> findByDipendente(Dipendente d);
}
