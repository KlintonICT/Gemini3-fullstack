package com.example.gemini;


import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AstronomicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int image_id;
    private String image_file;
    private VALIDATE_RESULT validate;
    private enum VALIDATE_RESULT {
        Null,Pass,Minor,Major;
    }
    @ManyToOne
    @JoinColumn
    private SciencePlan sciencePlan;

    public AstronomicalData() { }

    public AstronomicalData(String image_file, VALIDATE_RESULT validate,String comment) {
        this.image_file = image_file;
        this.validate = validate;
    }

    public int getImage_id() {
        return image_id;
    }
    public String getImage_file() {
        return image_file;
    }
    public String getValidate() {
        switch (this.validate) {
            case Null:
                return "Null";
            case Pass:
                return "Pass";
            case Major:
                return "Major";
            case Minor:
                return "Minor";
            default:
                return "error";
        }
    }

    //**********************************************************//
    public void setImage_file(String image_file) {
        this.image_file = image_file;
    }
    public void setValidate(String validate) {
        this.validate = VALIDATE_RESULT.valueOf(validate);
    }
    public void setPlan(SciencePlan sciencePlan) {
        this.sciencePlan = sciencePlan;
    }

    //************************************************************//
    @Override
    public String toString() {
        return "AstronominicalData{" +
                ", Plan_id= " + this.sciencePlan.getPlanID() + '\'' +
                ", image_id= " + this.getImage_id() + '\'' +
                ", Image_file= " + this.getImage_file() + '\'' +
                ", Validate_result= " + this.getValidate() + '\'' +
                "}";
    }
}