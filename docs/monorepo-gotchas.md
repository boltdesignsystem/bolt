
## **Design System + Monorepo + Pattern Lab Insights**
### (aka. the things they forgot to teach you in Design System school)

1. **Having a Develop + Master branch complicates things**
So do I branch off develop, build my feature, merge back down to develop, publish and then merge my version bumps down to master? 

Or do I merge to master then publish separately? 

But wait, I thought we shouldn’t be doing updates directly on master… but publishing on branch that isn’t master also doesn’t feel right… @_@

2. **Solution: Kill Off Develop, Branch off Master (I know, crazy right?)**
With the develop branch gone, just branch everything off of master and it’s pretty much just business as usual.

Generally speaking, the workflow should be something around the lines of: 

- Branch your work off master
- Build some stuff
- Test, document, QA, build, etc.
- Pull in latest code from master via rebase (more on that later)
- PR back down to master, code review (with changes as needed), merge code down to master
- Verify master branch builds successfully
- Publish updated packages via `learna publish` 
- Delete the now-merged-in feature branch

3. **Use reasonable branch names.**
Name your branch based on the nature of the work being done. Some examples include:

	* `feature/video-player` —> building out a new feature
	* `hotfix/fix-btn-hover` —> quick fix to package already published
	* `chore/remove-www-folder` —> repo cleanup & maintainance
	* `experimental/replace-gulp-sass-task-with-webpack`  —> experimental. Tinkering so don’t remove but also don’t merge till ready for prime time.
	
4. **Rebase > Merge (Generally)**
Pull in and rebase master *instead* of merging in master (taking a page from [Material Components Web contribution guidelines](https://github.com/material-components/material-components-web/blob/master/CONTRIBUTING.md#submitting-pull-requests))

5. **Delete yo branch** 
After getting your updates merged in, practice good code hygiene  by removing branches no longer needed!

6. **There is such a thing as ~too much~ versioning**
Significantly consolidate packages based on the overarching purpose. 

For example, instead of having 3 separate packages for managing and organizing your ITCSS color settings, color tools, and color utils, combine all three of these things into a single versioned package while continue to keep things separated out in separate partials.

7. **~Reduce~ Inner Monorepo Dependencies**
Reduce internal Bolt to Bolt dependencies as much as possible!

![image](https://user-images.githubusercontent.com/1617209/33673997-522d6aa8-da7c-11e7-963e-5ab52fdf21e4.png)
Ughhhh.

The more things needing to be symlinked, the more likely things are going to fall out of sync + more frequent things will need to be arbitrarily published

8. **Reduce, but don’t totally eliminate, component dependencies.** 
We should strive to have full blown Components depend on only a handful of top-level Bolt packages: build tools (Webpack CLI), shared data, core utils, and a single all-encompassing Core CSS dependency (ie. ITCSS minus the Components layer)

9. **Nightly Release To Share Early? OK.., but ~only~ publish what you need** 
Publishing a nightly release of your in-progress feature branch is **OK** if (and that’s a big if) you tell Lerna to scope publish only what needs to be updated in order for your in-progress work to be consumed by others.

By default, running `learn publish --canary` not only adds an alpha prefix to every single package in your repo, but it also (by default) automatically bumps the version to the next minor release — both of which might not be the case with the actual changes your new feature / update requires.

![image](https://user-images.githubusercontent.com/1617209/33674018-6289daee-da7c-11e7-8051-5194a4e189d8.png)
But what if I’m just trying to share a hotfix to my button component… :-(

10. **Encapsulation > Minor Duplication** 
When possible, opt for baking in certain kinds of ITCSS generic layer resets into your component itself. 

For example, including a possibly-redundant `text-decoration: none` CSS rule in a Button components Sass file would help make the Component more portable (and not necessarily require an external ITCSS generic layer to be included). 

11. **Composition > Inheritance via optionalDependencies** 
When possible, we should aim to have Component dependencies on internal `@bolt/something` packages be `optionalDependencies` vs must-have `dependencies`: [package.json | npm Documentation](https://docs.npmjs.com/files/package.json#optionaldependencies)

```
{
	"name": "@bolt/components-button",
	"description": "Button component in the Bolt Design System",
	"style": "src/_button.scss",
	"dependencies": {
		"@bolt/core": "^0.3.0",
		"@bolt/core-ui": "^0.1.0"
	},
	"devDependencies": {
		"@bolt/build-webpack": "^0.4.0"
	},
	"optionalDependencies": {
		"@bolt/components-icon": "^0.3.1"
	},
	...
}
```

**Pro tip**
> You can also setup your Twig template includes to be more flexible with non-mission-critical includes by using the `ignore missing` parameter mentioned in the [Twig documentation](https://twig.symfony.com/doc/2.x/tags/include.html)
```
{# fake example of button.twig template with nested icon #}
...
<bolt-button>
	{{ text }}
	{% if icon %}
		{% include "@bolt/icon.twig" ignore missing with icon only %}
	{% endif %}
</bolt-button>
```

12. **Pattern Lab + Versioning via Lerna = 💀… Or Is It?**
First some bad news: Out of the box, Pattern Lab (generally**) can’t consume your patterns that are being versioned with Lerna (aka each bootstrapped pattern has a component-specific node_modules w/ installed dependencies). 

**Yes, going through symlink hell can work (with a bit of pain) but if you just want to have your code live in a vanilla `_patterns` folder AND get versioned via Lerna, the best case is you’re going to see very, very long compile times, assuming Pattern Lab doesn’t completely break while trying to compile.

### Example Pattern Lab Compile Times

1. Vanilla Pattern Lab w/o Lerna bootstrap: 27 seconds
![image](https://user-images.githubusercontent.com/1617209/33674028-6b03f326-da7c-11e7-8c98-a4786e230cfe.png)

2. Vanilla Pattern Lab + bootstrapping Lerna via the default  `learn bootstrap` command: 10+ minutes and ~still~ failed (2,222% slower) 😩
![image](https://user-images.githubusercontent.com/1617209/33674047-769cc4ce-da7c-11e7-9657-31fd50211bee.png)
…
![image](https://user-images.githubusercontent.com/1617209/33674058-7cd726ae-da7c-11e7-8bce-a8f50e940548.png)

So… that’s it? Monorepos using Lerna + Pattern Lab are a non-starter?

Thankfully, no. At least not anymore since working through this blocker ourselves.

13. **Getting Pattern Lab and Lerna to Play Nicely Together:**

- **Solution Part 1:** Bootstrap Lerna using the hoist option: `learna bootstrap --hoist`

This still ends up taking way too long —147 seconds (~551% slower), however it’s still better than the 10+ minutes it would have taken otherwise (plus, less chances Pattern Lab runs into an error due to a malformed nested file)
![image](https://user-images.githubusercontent.com/1617209/33674066-82a60b9a-da7c-11e7-818c-5e8c5922f0c0.png)

- **Solution Part 2:** Tell Pattern Lab to ignore nested node_modules thanks to a Patten Lab patch included in the Bolt Design System codebase: [bolt/ignoreCertainFolders.patch at master · bolt-design-system/bolt · GitHub](https://github.com/bolt-design-system/bolt/blob/master/.patches/ignoreCertainFolders.patch)

With patch + `learn bootstrap --hoist`: 24 seconds 
![image](https://user-images.githubusercontent.com/1617209/33674078-8aab7a00-da7c-11e7-9b4a-d7e9442db7af.png)

14. **Most publishing / downstream install issues stem from a handful of things**

Virtually all npm install + Lerna publish issues pop up due to a small number of things (including a combo of several of these):
	* Local packages referenced in  `@bolt/something-all` glob packages become out of sync
	* Publishing using Lerna's --scope which ignores bumping internal dependency versions
	* Publishing full on releases on non-master branches
	* Lerna publish failing due to a Git tag version of something already existing
	* Lerna publish failing due to a tag already existing on NPM
	* Publishing a package with a suffix that isn't supported by semver (ex. `rc` instead of `alpha` or `beta`
