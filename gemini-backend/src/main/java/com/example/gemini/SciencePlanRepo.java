package com.example.gemini;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SciencePlanRepo extends CrudRepository<SciencePlan, Integer> { }
