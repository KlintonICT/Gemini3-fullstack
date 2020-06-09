package com.example.gemini;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class UserDB {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String email;
    private String address;
    private String username;
    private String password;
    private enum user_role {ASTRONOMER, SCIENCEOBS}
    private user_role role;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable
    private List<SciencePlan> sciencePlan = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) { this.password = password;}

    public String getRole() {
        switch(this.role) {
            case ASTRONOMER: return "astronomer";
            case SCIENCEOBS: return "science observer";
            default: return "no such role exists";
        }
    }
    
    public void setRole(String role2) {
        this.role = user_role.valueOf(role2);
    }

    public void addSciencePlan(SciencePlan sc) {
        this.sciencePlan.add(sc);
    }

    public void removeSciencePlan(SciencePlan sc) {
        this.sciencePlan.remove(sc);
    }

    public String getSciencePlan() {
        if(this.sciencePlan != null) {
            StringBuilder s = new StringBuilder();
            for(SciencePlan sc: this.sciencePlan) {
                s.append("id: ").append(sc.getPlanID()).append(", plan_name: ").append(sc.getPlanName());
                s.append("; ");
            }
            return s.toString();
        }
        return "No science plan found";
    }

}
