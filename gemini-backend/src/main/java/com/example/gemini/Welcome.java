package com.example.gemini;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Welcome {
    @GetMapping("/welcome")
    public String welcome(
            @RequestParam(value="username", required = true) String username,
            Model model) {
        model.addAttribute("currentUser", username);
        return "main";
    }
}
