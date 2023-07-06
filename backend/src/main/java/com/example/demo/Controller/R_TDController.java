package com.example.demo.Controller;


import com.example.demo.Entity.R_TD;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.TurnoDipendenteNotExistsException;
import com.example.demo.Exception.TurnoLavorativoNotExistsException;
import com.example.demo.Service.DtoRTD;
import com.example.demo.Service.R_TDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class R_TDController {

    @Autowired
    private R_TDService rtdService;

    @PostMapping("/postRTD/{id}/{id_t}")
    public void createRTD(@PathVariable long id, @PathVariable long id_t, @RequestBody DtoRTD dati ) throws DipendenteNotExistsException, TurnoLavorativoNotExistsException {
        rtdService.rtdCreate(id,id_t,dati);
    }

    @PostMapping("/modificaRTD/{id}")
    public R_TD updateRTD(@PathVariable Long id,@RequestBody R_TD nuovo) throws TurnoDipendenteNotExistsException {
        return rtdService.rtdUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteRTD/{id}")
    public R_TD deleteRTD(@PathVariable Long id) throws TurnoDipendenteNotExistsException {
        return rtdService.rtdDelete(id);
    }
    @GetMapping("/RTD")
    public List<R_TD> getAllRTD(){
        return rtdService.listaRtdRead();
    }

    @GetMapping("/filtriRTD/{data}/{idDipendente}")
    public List<R_TD> getAllRTD(@PathVariable String data, @PathVariable Long idDipendente) throws TurnoDipendenteNotExistsException, DipendenteNotExistsException, ParseException {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sd.parse(data);
        return rtdService.rtdFiltri(date,idDipendente);
    }

}
