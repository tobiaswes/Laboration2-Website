package it.ha.ax.laboration2website.repository;

import it.ha.ax.laboration2website.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    // Search videos by title containing the search term (case-insensitive)
    @Query("SELECT v FROM Video v WHERE LOWER(v.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Video> searchByTitle(@Param("keyword") String keyword);
    // Find all videos added by a specific user
    List<Video> findByAddedBy(String addedBy);

}
