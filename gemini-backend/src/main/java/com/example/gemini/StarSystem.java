package com.example.gemini;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StarSystem{

    
    public enum Category{
        planet, satellite, comet, others
    }
    public enum Planet{
        MERCURY,EARTH,VENUS,MARS,JUPITER,SATURN,URANUS,NEPTUNE,PLUTO,Ceres
    }
    public enum Satellite {
        Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto
    }
    public enum Comet{
        P9_Tempel_1, P19_Borrelly
    }
    public enum Others{
        SUN,Earth_Moon_Barycenter, Nutation,Libration,Solar_System_Barycenter,Comet,Asteroid,NEO
    }
    public enum Earth{
        Moon
    }
    public enum Mars{
        Phobos, Deimos
    }
    public enum Jupiter{
        Io,Europa,Ganymede,Callisto
    }
    public enum Saturn{
        Mimas,Enceladus,Tethys,Dione,Rhea,Titan,Hyperion,Iapetus
    }
    public enum Uranus{
        Miranda,Ariel,Umbriel,Titania,Oberon
    }

    public enum Neptune{
        Naiad,Thalassa,Despina,Galatea,Larissa,Proteus,Triton,Nereid
    }
    public enum Pluto{
        Charon
    }

    private Category category;
    private Planet planet;
    private Comet comet;
    private Others others;
    private Earth earth;
    private Mars mars;
    private Jupiter jupiter;
    private Saturn saturn;
    private Uranus uranus;
    private Neptune neptune;
    private Pluto pluto;

    public StarSystem() { }

    public StarSystem(Category category) {
        this.category = category;
    }

    public List<Object> getCategory (String category) {
        List<Object> enumvalues = new ArrayList<>();
        switch (Category.valueOf(category)) {
            case planet:
                enumvalues = Arrays.asList(Planet.values());
                break;
            case satellite:
                enumvalues = Arrays.asList(Satellite.values());
                break;
            case comet:
                enumvalues = Arrays.asList(Comet.values());
                break;
            case others:
                enumvalues = Arrays.asList(Others.values());
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + category);
        }
        return enumvalues;
    }
    public String getPlanet(Object planet) {
        switch (this.planet) {
            case MERCURY:
                return "Mercury";
            case EARTH:
                return "Earth";
            case VENUS:
                return "Venus";
            case MARS:
                return "Mars";
            case JUPITER:
                return "Jupiter";
            case SATURN:
                return "Saturn";
            case URANUS:
                return "Uranus";
            case NEPTUNE:
                return "Neptune";
            case PLUTO:
                return "Pluto";
            case Ceres:
                return "Ceres";
            default:
                throw new IllegalStateException("Unexpected value: " + this.planet);
        }
    }

    public List<Object> getsat(String subCategory) {
        List<Object> enumvalues = new ArrayList<>();
        switch (Satellite.valueOf(subCategory)) {
            case Earth:
                enumvalues = Arrays.asList(Earth.values());
                break;
            case Mars:
                enumvalues = Arrays.asList(Mars.values());
                break;
            case Jupiter:
                enumvalues = Arrays.asList(Jupiter.values());
                break;
            case Saturn:
                enumvalues = Arrays.asList(Saturn.values());
                break;
            case Uranus:
                enumvalues = Arrays.asList(Uranus.values());
                break;
            case Neptune:
                enumvalues = Arrays.asList(Neptune.values());
                break;
            case Pluto:
                enumvalues = Arrays.asList(Pluto.values());
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + subCategory);
        }
        return enumvalues;
    }
    public String getcomet(Object comet)
    {
        switch (this.comet) {
            case P9_Tempel_1:
                return "P9 Tempel 1";
            case P19_Borrelly:
                return "P19 Borrelly";
            default:
                throw new IllegalStateException("Unexpected value: " + this.comet);
        }
    }
    public String getothers(Object others) {
        switch (this.others) {
            case SUN:
                return "Sun";
            case Earth_Moon_Barycenter:
                return "Earth Moon Barycenter";
            case Nutation:
                return "Nutation";
            case Libration:
                return "Libration";
            case Solar_System_Barycenter:
                return "Solar System Barycenter";
            case Comet:
                return "Comet";
            case Asteroid:
                return "Asteroid";
            case NEO:
                return "NEO";
            default:
                throw new IllegalStateException("Unexpected value: " + this.others);
        }
    }
    public String getearth_sat(Object earth) {
        switch (this.earth)
        {
            case Moon:
                return "Moon";
            default:
                throw new IllegalStateException("Unexpected value: " + this.earth);

        }
    }
    public String getmars_sat(Object mars){
        switch (this.mars) {
            case Phobos:
                return "Phobos";
            case Deimos:
                return "Deimos";
            default:
                throw new IllegalStateException("Unexpected value: " + this.mars);
        }
    }
    public String getjupiter_sat(Object jupiter) {
        switch (this.jupiter) {
            case Io:
                return "Io";
            case Europa:
                return "Europa";
            case Callisto:
                return "Callisto";
            case Ganymede:
                return "Ganymede";
            default:
                throw new IllegalStateException("Unexpected value: " + this.jupiter);
        }
    }
    public String geturanus_sat(Object uranus)
    {
        switch (this.uranus)
        {
            case Ariel:
                return "Areil";
            case Oberon:
                return "Oberon";
            case Miranda:
                return "Miranda";
            case Titania:
                return "Titania";
            case Umbriel:
                return "Umbriel";
            default:
                throw new IllegalStateException("Unexpected value: " + this.uranus);
        }
    }
    public String getsaturn_sat(Object saturn)
    {
        switch (this.saturn)
        {
            case Rhea:
                return "Rhea";
            case Dione:
                return "Dione";
            case Mimas:
                return "Mimas";
            case Titan:
                return "Titan";
            case Tethys:
                return "Tethys";
            case Iapetus:
                return "Iapetus";
            case Hyperion:
                return "Hyperion";
            case Enceladus:
                return "Enceladus";
            default:
                throw new IllegalStateException("Unexpected value: " + this.saturn);
        }
    }
    public String getneptune_sat(Object neptune)
    {
        switch (this.neptune)
        {
            case Naiad:
                return "Naiad";
            case Despina:
                return "Despina";
            case Galatea:
                return "Galatea";
            case Larissa:
                return "Larissa";
            case Proteus:
                return "Proteus";
            case Thalassa:
                return "Thalassa";
            case Nereid:
                return "Nereid";
            case Triton:
                return "Triton";
            default:
                throw new IllegalStateException("Unexpected value: " + this.neptune);
        }
    }
    public String getpluto_sat(Object pluto)
    {
        switch (this.pluto)
        {
            case Charon:
                return "Charon";
            default:
                throw new IllegalStateException("Unexpected value: " + this.pluto);
        }
    }
}