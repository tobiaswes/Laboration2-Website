package it.ha.ax.laboration2website.service;

import it.ha.ax.laboration2website.entity.Video;
import it.ha.ax.laboration2website.repository.VideoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {


    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository){

        this.videoRepository = videoRepository;
    }

    // get all videos
    public List<Video> getAllVideos(){
        return videoRepository.findAll();
    }

    // Add a new video
    public Video createVideo(String title, String link, String addedBy, String category, String description){
        Video video = new Video(null, title, link, LocalDateTime.now(), addedBy, category, description);
        return videoRepository.save(video);
    }
    // Update an existing video
    public Video updateVideo(Long id, String title, String link, String addedBy, String category, String description){
        Optional<Video> existingVideo = videoRepository.findById(id);

        if(existingVideo.isPresent()){
            Video video = existingVideo.get();
            video.setTitle(title);
            video.setLink(link);
            video.setAddedBy(addedBy);
            video.setCategory(category);
            video.setDescription(description);
            return videoRepository.save(video);

        } else {
            throw new RuntimeException("Video not found with id: " + id);
        }

    }
    // Delete a video
    public void deleteVideo(Long id){
        if(videoRepository.existsById(id)){
            videoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Video not found by id:" + id);
        }
    }
    // Retrieve videos by a specific user
    public List<Video> getVideosByUser(String username) {
        return videoRepository.findByAddedBy(username);
    }
    // Search videos by title keyword
    public List<Video> searchVideosByTitle(String keyword) {

        return videoRepository.searchByTitle(keyword);
    }
}
