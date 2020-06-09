package com.example.gemini;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
public class Login {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/login")
    public String login(Model model) {
        ArrayList<UserDB> allUsers = new ArrayList<UserDB>();
        for(UserDB u: userRepository.findAll()) {
            allUsers.add(u);
        }
        model.addAttribute("users", allUsers);
        return "login";
    }
}
