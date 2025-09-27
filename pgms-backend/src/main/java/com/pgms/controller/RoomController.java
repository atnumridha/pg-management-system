package com.pgms.controller;

import com.pgms.model.Room;
import com.pgms.repository.RoomRepository;
import com.pgms.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins = "http://localhost:4200")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id " + id));
        return ResponseEntity.ok(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id " + id));

        room.setPropertyId(roomDetails.getPropertyId());
        room.setNumber(roomDetails.getNumber());
        room.setType(roomDetails.getType());
        room.setCapacity(roomDetails.getCapacity());
        room.setRentBase(roomDetails.getRentBase());
        room.setAmenities(roomDetails.getAmenities());
        room.setStatus(roomDetails.getStatus());

        Room updatedRoom = roomRepository.save(room);
        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id " + id));
        roomRepository.delete(room);
        return ResponseEntity.ok().build();
    }
}
