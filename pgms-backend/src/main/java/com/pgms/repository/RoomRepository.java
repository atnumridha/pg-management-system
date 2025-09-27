package com.pgms.repository;

import com.pgms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    java.util.List<com.pgms.model.Room> findByStatus(String status);
}
