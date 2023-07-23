package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class GiornataFeriale {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Temporal(TemporalType.DATE)
    @Column(unique = true)
    private Date dataGiornataFeriale;

    @OneToMany(mappedBy = "giornataFeriale")
    @JsonIgnore
    private List<R_FD> rfd;


    private long quantità;

    @Version
    private long versione;


}
