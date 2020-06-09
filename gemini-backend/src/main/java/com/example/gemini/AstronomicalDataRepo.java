package com.example.gemini;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AstronomicalDataRepo extends CrudRepository<AstronomicalData, Integer> { }
