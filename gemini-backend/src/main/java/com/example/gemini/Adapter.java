package com.example.gemini;

import edu.gemini.app.ocs.OCS;
import edu.gemini.app.ocs.example.MyObservingProgram;
import edu.gemini.app.ocs.model.BaseObservingProgram;
import edu.gemini.app.ocs.model.BaseSciencePlan;
import edu.gemini.app.ocs.model.Filter;
import edu.gemini.app.ocs.model.Lens;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class Adapter {

    public Adapter() { }

    public void addSciencePlan(OCS ocs, SciencePlanRepo sciencePlanRepo) {
        int i = 0;
        for(SciencePlan sc: sciencePlanRepo.findAll()) {
            AdapterSciencePlan sciencePlan = new AdapterSciencePlan();
            sciencePlan.fromSciencePlan(sc);
            BaseObservingProgram myOP = new BaseObservingProgram();
            myOP.setId(i++);
            myOP.setLoc(ocs.getLocation(sc.getStartDate().getYear(), sc.getStartDate().getMonth(),
                    sc.getStartDate().getDay(), sc.getStarSystem()));
            myOP.setLens(new Lens("Canon", "DX-300", "Canon Inc.", 2018));
            Filter f1 = new Filter("Canon", "Canon Inc.", "RF-200", 2017, 5, 2.5);
            ArrayList<Filter> filters1 = new ArrayList<Filter>();
            filters1.add(f1);
            myOP.setFilters(filters1);
            ArrayList<Double> exp1 = new ArrayList<>();
            exp1.add(0.25);
            myOP.setExposures(exp1);
            myOP.setLightDetectorOn(false);
            myOP.setSpecialEquipments(null);
            edu.gemini.app.ocs.model.AstronomicalData data = new edu.gemini.app.ocs.model.AstronomicalData();
            myOP.setAstroData(data);
            sciencePlan.setObservingProgram(myOP);
            ocs.submitSciencePlan(sciencePlan);
            System.out.println(data);
            System.out.println("adapter\n" + sciencePlan);
        }
    }

}
