package com.example.gemini;

import com.example.gemini.UserDB;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserDB, Integer> { }
