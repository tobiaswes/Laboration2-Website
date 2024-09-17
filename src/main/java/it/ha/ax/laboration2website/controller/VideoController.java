package it.ha.ax.laboration2website.controller;


import it.ha.ax.laboration2website.entity.Video;
import it.ha.ax.laboration2website.service.VideoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/video")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService){

        this.videoService = videoService;
    }

    @GetMapping("/")
    public List<Video> getAllVideos(){

        return videoService.getAllVideos();
    }

    @PostMapping("/upload")
    public Video createVideo(@RequestBody Video video){
        return videoService.createVideo(video.getTitle(), video.getLink(), video.getUploadedBy(), video.getCategory(), video.getDescription());
    }

    @PutMapping("/{id}")
    public Video updateVideo(@PathVariable Long id, @RequestBody Video videoRequest){
        return videoService.updateVideo(
                id,
                videoRequest.getTitle(),
                videoRequest.getLink(),
                videoRequest.getUploadedBy(),
                videoRequest.getCategory(),
                videoRequest.getDescription()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id){

        videoService.deleteVideo(id);
    }

    @GetMapping("/search")
    public List<Video> searchVideos(@RequestParam("q") String query) {
        return videoService.searchVideosByTitle(query);
    }
}


