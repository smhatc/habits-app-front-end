import { Link } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import RecentHabits from "../RecentHabits/RecentHabits";
import "./HomePage.css";

const HomePage = ({ user, handleSearch, habits }) => {
  return (
    <main>
      {user ? (
        <>
          <h1>Welcome back, {user.username}!</h1>
          <SearchBar handleSearch={handleSearch} />
          <RecentHabits habits={habits} />
        </>
      ) : (
        <>
          <section className="home-hero">
            <div className="home-hero-text">
              <h1 className="home-hero-text-heading">
                Improve your life,
                <br />
                one habit at a time.
              </h1>
              <div className="home-hero-text-subheading">
                <p className="home-hero-text-subheading-para">
                  HabitsApp helps you build routines that stick — without the
                  mental weight. Add habits, view completion logs, and celebrate
                  your progress every day.
                </p>
                <p className="home-hero-text-subheading-para">
                  Ready to turn intention into action?
                </p>
              </div>
              <div className="home-hero-text-cta">
                <div className="home-hero-text-cta-btns">
                  <Link
                    className="home-hero-text-cta-btns-btnlink"
                    to={"/sign-in"}
                  >
                    Sign In
                  </Link>
                  <Link
                    className="home-hero-text-cta-btns-btnlink home-hero-text-cta-btns-signuplink"
                    to={"/sign-up"}
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="home-hero-text-cta-link">
                  Not convinced? <a href="#home-howto">See how it works</a>.
                </div>
              </div>
            </div>
            <figure className="home-hero-imagefigure">
              <img
                className="home-hero-imagefigure-image"
                src="/assets/images/home-hero-image.png"
                alt="HabitsApp Banner Image"
              />
            </figure>
          </section>
          <section id="home-howto" className="home-howto">
            <div className="home-howto-text">
              <h2 className="home-howto-text-heading">How It Works</h2>
              <p className="home-howto-text-para">
                Create an account to save your habits and access them anytime,
                anywhere!
              </p>
              <p className="home-howto-text-para">
                Add new habits with a name, description, and the desired
                frequency.
              </p>
              <p className="home-howto-text-para">
                Unhappy with your habit? Edit or delete it.
              </p>
              <p className="home-howto-text-para">
                See an index of all your habits and search through them!
              </p>
              <p className="home-howto-text-para">
                Click on a habit to view its completion history.
              </p>
            </div>
          </section>
          <section className="home-reviews">
            <h2 className="home-reviews-heading">What Our Users Are Saying</h2>
            <div className="home-reviews-list">
              <blockquote className="home-review">
                "I built a 90‑day writing habit using HabitsApp. The daily
                check‑ins and streaks made it effortless to keep going."
                <cite>— TotallyReal Human</cite>
              </blockquote>
              <blockquote className="home-review">
                "Simple, beautiful, and motivating. I didn’t know a habit
                tracker could be this gentle and effective! Ever!"
                <cite>— Me TheUser</cite>
              </blockquote>
              <blockquote className="home-review">
                "I stopped missing workouts and am finally consistent. I feel
                much better than I used to. This is definitely 100% accurate."
                <cite>— SendHelp INeedSleep</cite>
              </blockquote>
            </div>
            <p className="home-reviews-para">
              Join 120,000+ <em>real</em> people building better routines with
              HabitsApp.
            </p>
          </section>
        </>
      )}
    </main>
  );
};

export default HomePage;
