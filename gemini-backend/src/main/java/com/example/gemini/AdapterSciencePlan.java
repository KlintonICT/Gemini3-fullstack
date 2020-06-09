package com.example.gemini;

import edu.gemini.app.ocs.OCS;
import edu.gemini.app.ocs.example.MyObservingProgram;
import edu.gemini.app.ocs.model.BaseSciencePlan;
import edu.gemini.app.ocs.model.DataProcRequirement;
import jparsec.ephem.Target;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Date;

public class AdapterSciencePlan extends BaseSciencePlan {

    public AdapterSciencePlan() {
        super();
    }

    public AdapterSciencePlan(String creator, String submitter, Double funding,
                              String objectives, Target.TARGET starSystem,
                              Date startDate, Date endDate, TELESCOPELOC telescopeLocation,
                              ArrayList<DataProcRequirement> dataProcRequirements) {
        super(creator, submitter, funding, objectives, starSystem, startDate,
                endDate, telescopeLocation, dataProcRequirements);
    }

    public void fromSciencePlan(SciencePlan sc) {
        this.setPlanNo(sc.getPlanID());
        this.setCreator(sc.getCreator());
        this.setSubmitter(sc.getSubmitter());
        this.setFundingInUSD(sc.getFundingInUSD());
        this.setObjectives(sc.getObjectives());
        this.setStarSystem(sc.getStarSystem());
        this.setStartDate(sc.getStartDate());
        this.setEndDate(sc.getEndDate());
        this.setTelescopeLocation(sc.getTelescopeLocation());
        this.setStatus(STATUS.COMPLETE);
        DataProcRequirement dataProcRequirement = new DataProcRequirement();
        dataProcRequirement.setBrightness(sc.getBrightness());
        dataProcRequirement.setColorType(sc.getColorType());
        dataProcRequirement.setContrast(sc.getContrast());
        dataProcRequirement.setFileQuality(sc.getFileQuality());
        dataProcRequirement.setFileType(sc.getFileType());
        dataProcRequirement.setSaturation(sc.getSaturation());
        ArrayList<DataProcRequirement> dataList = new ArrayList<>();
        this.setDataProcRequirements(dataList);
    }

}
