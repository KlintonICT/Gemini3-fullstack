package com.example.gemini;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/register")
    public @ResponseBody
    String addNewUser(@RequestBody UserDB userinfo) {
        for(UserDB o: getAllUsers()) {
            if(userinfo.getUsername().equals(o.getUsername())) {
                return "Username already exists.";
            }
        }
        userRepository.save(userinfo);
        return "Registered successfully";
    }

    @CrossOrigin
    @GetMapping("/allusers")
    public @ResponseBody Iterable<UserDB> getAllUsers() {
        // This returns a JSON or XML with the users
        if(userRepository.findById(1).isPresent()) {
            //System.out.println(userRepository.findById(1).get().getSciencePlan());
        }
        return userRepository.findAll();
    }
}