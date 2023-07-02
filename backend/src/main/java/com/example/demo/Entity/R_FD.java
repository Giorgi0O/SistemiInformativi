package com.example.demo.Entity;

import jakarta.annotation.security.DenyAll;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "r_fd")
public class R_FD {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "dipendente_id")
    private Dipendente dipendente;

    @ManyToOne
    @JoinColumn(name = "giornata_ferie_id")
    private GiornataFeriale giornataFeriale;


}
