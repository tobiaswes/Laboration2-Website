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

    //hämtar alla videos
    public List<Video> getAllVideos(){
        return videoRepository.findAll();
    }

    //ladda up ny video

    public Video createVideo(String title, String link, String uploadedBy, String category, String description){
        Video video = new Video(null, title, link, LocalDateTime.now(), uploadedBy, category, description);
        return videoRepository.save(video);
    }
    //uppdatera en video
    public Video updateVideo(Long id, String title, String link, String uploadedBy, String category, String description){
        Optional<Video> existingVideo = videoRepository.findById(id);

        if(existingVideo.isPresent()){
            Video video = existingVideo.get();
            video.setTitle(title);
            video.setLink(link);
            video.setUploadedBy(uploadedBy);
            video.setCategory(category);
            video.setDescription(description);
            return videoRepository.save(video);

        } else {
            throw new RuntimeException("Video not found with id: " + id);
        }

    }
    //ta bort en video
    public void deleteVideo(Long id){
        if(videoRepository.existsById(id)){
            videoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Video not found by id:" + id);
        }
    }
    //sök efter video titeln
    public List<Video> searchVideosByTitle(String keyword) {
        return videoRepository.searchByTitle(keyword);
    }
}
