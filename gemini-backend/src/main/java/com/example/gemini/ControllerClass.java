package com.example.gemini;

import edu.gemini.app.ocs.OCS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.DoubleBuffer;
import java.util.*;

@Controller
public class ControllerClass {

    @Autowired
    private SciencePlanRepo sciencePlanRepo;
    @Autowired
    private AstronomicalDataRepo astronomicalDataRepo;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @GetMapping("/insertcategory")
    public @ResponseBody Object insertcategory(@RequestParam String category)
    {
        StarSystem ss = new StarSystem();
        return ss.getCategory(category);
    }

    @CrossOrigin
    @GetMapping("/insertsatellite")
    public @ResponseBody Object insertsatellite(@RequestParam String satellite)
    {
        StarSystem ss = new StarSystem();
        return ss.getsat(satellite);
    }


    @CrossOrigin
    @GetMapping("/getValidatedImage")
    public @ResponseBody List<String> getImageNotMajor(@RequestParam int id, @RequestParam Boolean includeMajor) {
        List<String> list = new ArrayList<>();
        if(sciencePlanRepo.findById(id).isPresent()) {
            SciencePlan sc = sciencePlanRepo.findById(id).get();
            for(AstronomicalData data: sc.getAstroData() ) {
                if(includeMajor) {
                    list.add(data.getImage_file());
                } else if(!data.getValidate().equals("Major") && !data.getValidate().equals("error")) {
                    list.add(data.getImage_file());
                }
            }
        }
        return list;
    }

    @CrossOrigin
    @PutMapping("/setValidateAstronomicalData")
    public @ResponseBody
    String setValidateData(@RequestBody Map<String, Object> body){
        SciencePlan sc = sciencePlanRepo.findById((int) body.get("plan_no")).get();
        sc.setComment(body.get("comment").toString());
        sc.setStat("V");
        for(Map<String, Object> o: (ArrayList<Map<String, Object>>) body.get("validate")) {
            AstronomicalData as = astronomicalDataRepo.findById((Integer) o.get("id")).get();
            as.setValidate(o.get("Validate_result").toString());
            astronomicalDataRepo.save(as);
        }
        sciencePlanRepo.save(sc);
        return "Successfully changed the validate result!";
    }

    @CrossOrigin
    @GetMapping("/getSciencePlan")
    public @ResponseBody
    Iterable<SciencePlan> getAllSciencePlans() {
        return sciencePlanRepo.findAll();
    }

    @CrossOrigin
    @GetMapping("/getSciencePlanByStatus")
    public @ResponseBody
    Iterable<SciencePlan> getSciencePlanByStatus(@RequestParam String status) {
        List<SciencePlan> plans = new ArrayList<>();
        for (SciencePlan sc : getAllSciencePlans()) {
            if (sc.checkStatus(sc.statusFromString(status))) plans.add(sc);
        }
        return plans;
    }


    @CrossOrigin
    @PostMapping("/createSciencePlan")
    public @ResponseBody
    String createSciencePlan(@RequestBody Map<String, Object> body) {
        SciencePlan sc = new SciencePlan();
        sciencePlanRepo.save(sc);
        addsci(sc, body);
        ArrayList<String> imgurl = getImageurl();
        Random rand = new Random();
        int ran=0;
        int a = rand.nextInt(5) + 1;
        for(int i=0; i<a; i++) {
            AstronomicalData as = new AstronomicalData();
            ran = rand.nextInt((imgurl.size())-1);
            String result = imgurl.get(ran);
            as.setImage_file(result);
            as.setPlan(sc);
            as.setValidate("Null");
            astronomicalDataRepo.save(as);
            sc.addAstroData(as);
        }
       sciencePlanRepo.save(sc);
        return sc.toString();
    }

    @CrossOrigin
    @PutMapping("/updateSciencePlan")
    public @ResponseBody
    String updateSciencePlan(@RequestParam int id, @RequestBody Map<String, Object> body) {
        if(sciencePlanRepo.findById(id).isPresent()) {
            SciencePlan sc = sciencePlanRepo.findById(id).get();
            addsci(sc, body);
            return "Successfully Updated Science plan_id [" + id + "].";
        } else return "Science plan not found.";
    }

    private void addsci (SciencePlan sc, Map<String, Object> body) {
        sc.setPlanName(body.get("planName").toString());
        sc.setCreator(body.get("creator").toString());
        sc.setStarSystem(body.get("starSystem").toString());
        sc.setCategory(body.get("category").toString());
        if(body.get("subCategory")!=null) {
            sc.setSubCategory(body.get("subCategory").toString());
        }
        if(body.get("Comment")!=null) {
            sc.setComment(body.get("Comment").toString());
        }
        sc.setStartDate(body.get("startDate").toString());
        sc.setEndDate(body.get("endDate").toString());
        sc.setTelescopeLocation(body.get("telescopeLocation").toString());
        sc.setColorType(body.get("colorType").toString());
        sc.setColors(Double.parseDouble(body.get("colors").toString()));
        sc.setObjectives(body.get("objectives").toString());
        sc.setFundingInUSD(Double.parseDouble(body.get("fundingInUSD").toString()));
        sc.setFileType(body.get("fileType").toString());
        sc.setFileQuality(Double.parseDouble(body.get("fileQuality").toString()));
        sc.setContrast(Double.parseDouble(body.get("contrast").toString()));
        sc.setBrightness(Double.parseDouble(body.get("brightness").toString()));
        sc.setSaturation(Double.parseDouble(body.get("saturation").toString()));
        if(sc.getCollaborator()!=null || !sc.getCollaborator().isEmpty()) {
            for(UserDB user: sc.getCollaborator()) {
                user.removeSciencePlan(sc);
                userRepository.save(user);
            }
        }
        sc.setCollaborator(getCollaboratorList((ArrayList<Map<String, Object>>) body.get("collaborator"), sc));
        this.checkConflict(sc);
        sciencePlanRepo.save(sc);
    }

    private ArrayList<UserDB> getCollaboratorList(ArrayList<Map<String, Object>> body, SciencePlan sc) {
        ArrayList<UserDB> userList = new ArrayList<>();
        for(Map<String, Object> o: body) {
            Integer id = (Integer) o.get("id");
            UserDB theUser = userRepository.findById(id).get();
            theUser.addSciencePlan(sc);
            userList.add(theUser);
            userRepository.save(theUser);
        }
        return userList;
    }


    @CrossOrigin
    @PutMapping("/submitSciencePlan")
    public @ResponseBody
    String submitSciencePlan(@RequestParam int id, @RequestParam String user) {
        if(sciencePlanRepo.findById(id).isPresent()) {
            SciencePlan sc = sciencePlanRepo.findById(id).get();
            sc.setSubmitter(user);
            sc.setStat("S");
            sciencePlanRepo.save(sc);
            return "Successfully Submitted";
        } else return "Science plan not found.";
    }

    @CrossOrigin
    @DeleteMapping("/deleteSciencePlan")
    public @ResponseBody
    String deletePlan(@RequestBody int planId) {
        if(sciencePlanRepo.findById(planId).isPresent()) {
            SciencePlan sc = sciencePlanRepo.findById(planId).get();
            for(UserDB user: sc.getCollaborator()) {
                user.removeSciencePlan(sc);
                userRepository.save(user);
            }
            sciencePlanRepo.deleteById(planId);
            return "Deleted plan_id: [" + planId + "] successfully!";
        } return "Science plan not found.";
    }


    @CrossOrigin
    @PutMapping("/testPlan")
    public @ResponseBody String toTested(@RequestParam int planId) {
        if(sciencePlanRepo.findById(planId).isPresent()) {
            SciencePlan sc = sciencePlanRepo.findById(planId).get();
            sc.setStat("T");
            sciencePlanRepo.save(sc);
            return "Status changed!";
        } else return "Science plan not found.";
    }

    public void checkConflict(SciencePlan sc) {
        if(sciencePlanRepo != null) {
            sc.setStat("P");
            for (SciencePlan s : getAllSciencePlans()) {
                if (!s.equals(sc)) {
                    if (sc.isSchedConflict(s.getEndDate())) {
                        sc.setStat("C");
                    } else {
                        sc.setStat("P");
                        break;
                    }
                }
            }
            sciencePlanRepo.save(sc);
        }
    }

    @CrossOrigin
    @GetMapping("/getImages")
    public @ResponseBody BufferedImage getImagesBuffer(@RequestParam int id) {
        OCS ocs = new OCS();
        Adapter adapter = new Adapter();
        adapter.addSciencePlan(ocs, sciencePlanRepo);
        edu.gemini.app.ocs.model.AstronomicalData data = ocs.getSciencePlanByNo(id).getObservingProgram().getAstroData();
        try {
            return data.getAstronomicalData().get(0);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private  ArrayList<String> getImageurl() {
        ArrayList<String> imagePaths = new ArrayList<>();
        BufferedReader reader;
        File f = new File("references" + File.separator + "images.txt");
        try {
            reader = new BufferedReader(new FileReader(f));
            String line = reader.readLine();
            while (line != null) {
                // read next line
                line = reader.readLine();
                imagePaths.add(line);
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imagePaths;
    }

}