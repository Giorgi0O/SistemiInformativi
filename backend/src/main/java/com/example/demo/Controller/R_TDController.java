package com.example.demo.Controller;


import com.example.demo.Entity.R_TD;
import com.example.demo.Exception.TurnoDipendenteNotExistsException;
import com.example.demo.Service.DtoTD;
import com.example.demo.Service.R_TDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class R_TDController {

    @Autowired
    private R_TDService rtdService;

    @PostMapping("/postRTD")
    public void createRTD(@RequestBody R_TD rtd){
        rtdService.rtdCreate(rtd);
    }

    @PutMapping("/putRTD")
    public void updateRTD(@RequestBody R_TD vecchio,@RequestBody R_TD nuovo) throws TurnoDipendenteNotExistsException {
        rtdService.rtdUpdate(vecchio,nuovo);
    }

    @DeleteMapping("/deleteRTD")
    public void deleteRTD(@RequestBody R_TD rtd) throws TurnoDipendenteNotExistsException {
        rtdService.rtdDelete(rtd);
    }

    @GetMapping("/RTD")
    public List<R_TD> getAllRTD(){
        return rtdService.listaRtdRead();
    }

    @GetMapping("filtriRTD")
    public List<R_TD> getAllRTD(@RequestBody DtoTD dto) throws TurnoDipendenteNotExistsException {
        return rtdService.rtdFiltri(dto.getData(),dto.getDipendente());
    }

}
