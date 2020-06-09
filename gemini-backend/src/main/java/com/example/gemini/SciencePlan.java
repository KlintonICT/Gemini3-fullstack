package com.example.gemini;

import edu.gemini.app.ocs.model.BaseSciencePlan;
import edu.gemini.app.ocs.model.DataProcRequirement;
import jparsec.ephem.Target;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class SciencePlan {

    public enum list_status {P, T, C, S, V}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planID;
    private String planName;
    private list_status status;
    private String creator;
    private String submitter;
    private double fundingInUSD;
    private String objectives;
    private StarSystem.Category category;
    private StarSystem.Satellite subCategory;
    private Target.TARGET starSystem;
    private Date startDate;
    private Date endDate;
    private BaseSciencePlan.TELESCOPELOC telescopeLocation;
    // DataProcRequirement //
    private DataProcRequirement.TYPE fileType;
    private DataProcRequirement.COLOR_TYPE colorType;
    private double colors;
    private double fileQuality;
    private double contrast;
    private double brightness;
    private double saturation;
//    TODO("edit below so it works")
    @ManyToMany(mappedBy = "sciencePlan", fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    private List<UserDB> collaborator = new ArrayList<>();
    @OneToMany(mappedBy = "sciencePlan", cascade = CascadeType.ALL)
    private List<AstronomicalData> astroData = new ArrayList<>();
    private String comment;
    public SciencePlan() {    }

    public SciencePlan(String planName, String creator, double fundingInUSD,
                       String objectives, String starSystem, String category, String subCategory,
                       String startDate, String endDate, String telescopeLocation, String fileType,
                       String colorType, double colors, double fileQuality, double contrast,
                       double brightness, double saturation, List<UserDB> collaborator) {
        this.planName = planName;
        this.creator = creator;
        this.fundingInUSD = fundingInUSD;
        this.objectives = objectives;
        this.comment = comment;
        this.setStat("P");
        this.setStarSystem(starSystem);
        this.setCategory(category);
        this.setSubCategory(subCategory);
        this.setStartDate(startDate);
        this.setEndDate(endDate);
        this.setTelescopeLocation(telescopeLocation);
        this.setColorType(colorType);
        this.setColors(colors);
        this.setFileType(fileType);
        this.setFileQuality(fileQuality);
        this.setContrast(contrast);
        this.setBrightness(brightness);
        this.setSaturation(saturation);
        this.setCollaborator(collaborator);
    }

    public void setStat(String status) {
        this.status = this.statusFromString(status);
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public void setStartDate(String startDate) {
        try {
            this.startDate = new SimpleDateFormat("dd/MM/yyyy").parse(startDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void setEndDate(String endDate) {
        try {
            this.endDate = new SimpleDateFormat("dd/MM/yyyy").parse(endDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void setPlanID(int planID){this.planID = planID;};

    public void setTelescopeLocation(String loc) {
        this.telescopeLocation = BaseSciencePlan.TELESCOPELOC.valueOf(loc);
    }

    public void setStarSystem(String starSys) {
        this.starSystem = Target.TARGET.valueOf(starSys);
    }

    public void setCategory(String category) {
        this.category = StarSystem.Category.valueOf(category);
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = StarSystem.Satellite.valueOf(subCategory);
    }

    public void setFileType(String type) {
        this.fileType = DataProcRequirement.TYPE.valueOf(type);
    }

    public void setColorType(String colorType) {
        this.colorType = DataProcRequirement.COLOR_TYPE.valueOf(colorType);
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public void setSubmitter(String submitter) {
        this.submitter = submitter;
    }

    public void setFundingInUSD(double fundingInUSD) {
        this.fundingInUSD = fundingInUSD;
    }

    public void setObjectives(String objectives) {
        this.objectives = objectives;
    }

    public void setColors(double colors) {
        if(colors >= 0 && colors <= 100) {
            this.colors = colors;
        } else this.colors = 50;
    }

    public void setFileQuality(double fileQuality) {
        if(fileQuality >= 0 && fileQuality <= 100) {
            this.fileQuality = fileQuality;
        } else this.fileQuality = 50;
    }

    public void setContrast(double contrast) {
        if(contrast >= 0 && contrast <= 100) {
            this.contrast = contrast;
        } else this.contrast = 50;
    }

    public void setBrightness(double brightness) {
        if(brightness >= 0 && brightness <= 100) {
            this.brightness = brightness;
        } else this.brightness = 50;
    }

    public void setSaturation(double saturation) {
        if(saturation >= 0 && saturation <= 100) {
            this.saturation = saturation;
        } else this.saturation = 50;
    }

    public void setCollaborator(List<UserDB> collaborator) {
        if(!this.collaborator.isEmpty()) {
            this.collaborator.clear();
        }
        this.collaborator = collaborator;
    }
    public void setAstroData(List<AstronomicalData> astroData) {
        this.astroData = astroData;
    };

    public void setComment(String comment) {
        this.comment = comment;
    }

    // ================================================================================= //

    public String getPlanName() {
        return this.planName;
    }

    public Integer getPlanID() {
        return planID;
    }

    public String getCreator() {
        return creator;
    }

    public String getSubmitter() {
        return submitter;
    }

    public double getFundingInUSD() {
        return fundingInUSD;
    }

    public String getObjectives() {
        return objectives;
    }

    public Target.TARGET getStarSystem() {
        return starSystem;
    }

    public StarSystem.Category getCategory() {
        return category;
    }

    public StarSystem.Satellite getSubCategory() {
        return subCategory;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public BaseSciencePlan.TELESCOPELOC getTelescopeLocation() {
        return telescopeLocation;
    }

    public String getDataProcRequirements() {
        return "[filequality] : " + this.fileQuality + "; [file type] : " + fileType.toString() +
                "; [color type] : " + this.colorType.toString() + "; " +
                "; [colors] : " + this.colors + "[contrast] : " + this.contrast +
                "; [brightness] : " + this.brightness + "; [saturation] : " + this.saturation;
    }

    public String getStat() {
        switch (this.status) {
            case S:
                return "Submitted";
            case C:
                return "Conflicted";
            case P:
                return "Pending";
            case T:
                return "Tested";
            case V:
                return "Validated";
            default:
                return "No such status";
        }
    }

    public List<UserDB> getCollaborator() {
        return collaborator;

    }

    public DataProcRequirement.TYPE getFileType() {
        return fileType;
    }

    public DataProcRequirement.COLOR_TYPE getColorType() {
        return colorType;
    }

    public double getColors() {
        return colors;
    }

    public double getFileQuality() {
        return fileQuality;
    }

    public double getContrast() {
        return contrast;
    }

    public double getBrightness() {
        return brightness;
    }

    public double getSaturation() {
        return saturation;
    }

    public List<AstronomicalData> getAstroData() {
        return this.astroData;
    }

    public String getComment() {
        return comment;
    }


    // ================================================================================= //

    @Override
    public String toString() {
        return "BaseSciencePlan{" +
                "planNo=" + this.getPlanID() +
                ", status='" + this.getStat() + '\'' +
                ", creator='" + this.getCreator() + '\'' +
                ", submitter='" + this.getSubmitter() + '\'' +
                ", fundingInUSD=" + this.getFundingInUSD() +
                ", objectives='" + this.getObjectives() + '\'' +
                ", starSystem=" + this.getStarSystem().toString() +
                ", startDate=" + this.getStartDate().toString() +
                ", endDate=" + this.getEndDate().toString() +
                ", telescopeLocation='" + this.getTelescopeLocation().toString() + '\'' +
                ", dataProcRequirements: '" + this.getDataProcRequirements() + '\'' +
                ", collaborator: '"+ this.printCollab() + '\''+
                ", astronomical data: '" + this.printAstroData() + '\'' +
                ", Comment= " + this.getComment() + '\'' +
                '}';
    }

    public Boolean checkStatus(list_status status) {
        if(status!=null) {
            return this.status == status;
        } else return false;
    }

    public list_status statusFromString(String status) {
        switch (status) {
            case "P" :
            case "C" :
            case "V" :
            case "S" :
            case "T" : return list_status.valueOf(status);
            default: return null;
        }
    }

    public String printCollab() {
        if(this.collaborator != null) {
            StringBuilder s = new StringBuilder();
            for(UserDB user: this.collaborator) {
                s.append("id: ").append(user.getId()).append(", username: ").append(user.getUsername());
                s.append("; ");
            }
            return s.toString();
        }
        return "No collaborator found";
    }

    public String printAstroData() {
        if(this.astroData != null) {
            StringBuilder s = new StringBuilder();
            for(AstronomicalData data: this.astroData) {
                s.append("id: ").append(data.getImage_id());
                s.append(", URL: ").append(data.getImage_file());
                s.append("; ");
            }
            return s.toString();
        }
        return "No astronomical data found.";
    }

    public void addAstroData(AstronomicalData data) {
        this.astroData.add(data);
    }

    public void removeAstroData(AstronomicalData data) {
        this.astroData.remove(data);
    }

    // if there is conflict (before end date of other plans), return true
    public Boolean isSchedConflict(Date endExistPlan) {
        return this.startDate.before(endExistPlan);
    }

}