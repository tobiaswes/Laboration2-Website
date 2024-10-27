package it.ha.ax.laboration2website.controller;


import it.ha.ax.laboration2website.entity.Video;
import it.ha.ax.laboration2website.service.VideoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/video")
@CrossOrigin(origins = "http://localhost:4200")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService){

        this.videoService = videoService;
    }

    // get a list of all videos
    @GetMapping("/")
    public List<Video> getAllVideos(){

        return videoService.getAllVideos();
    }

    // Add a new video
    @PostMapping("/upload")
    public Video createVideo(@RequestBody Video video){
        return videoService.createVideo(video.getTitle(), video.getLink(), video.getAddedBy(), video.getCategory(), video.getDescription());
    }

    // Update an existing video by ID
    @PutMapping("/{id}")
    public Video updateVideo(@PathVariable Long id, @RequestBody Video videoRequest){
        return videoService.updateVideo(
                id,
                videoRequest.getTitle(),
                videoRequest.getLink(),
                videoRequest.getAddedBy(),
                videoRequest.getCategory(),
                videoRequest.getDescription()
        );
    }

    // Delete a video by ID
    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id){

        videoService.deleteVideo(id);
    }

    // get all videos added by a specific user
    @GetMapping("/user/{username}")
    public List<Video> getVideosByUser(@PathVariable String username) {
        return videoService.getVideosByUser(username);
    }

    // Search for videos by title based on a query parameter
    @GetMapping("/search")
    public List<Video> searchVideos(@RequestParam("q") String query) {

        return videoService.searchVideosByTitle(query);
    }
}


