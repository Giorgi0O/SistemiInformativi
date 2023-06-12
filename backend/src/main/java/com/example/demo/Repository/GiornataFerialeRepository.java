package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.GiornataFeriale;

@Repository
public interface GiornataFerialeRepository extends JpaRepository<GiornataFeriale, Long> {

}
