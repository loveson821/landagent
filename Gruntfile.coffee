module.exports = (grunt) ->
  version = ->
    grunt.file.readJSON("package.json").version
    
  version_tag = ->
    "v#{version()}"

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    
    coffeelint:
      app: ['app/**/*.coffee', 'config/**/*.coffee', '*.coffee']
    
    coffee:
      options:
        bare: true
      files: [
        expand: true
        src: ['**/*.coffee']
        dest: 'config'
        ext: '.js'
      ]
        
    server:
      dev: 'this ia path'
      pro: 'this is pro'
      
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  
  grunt.loadNpmTasks 'grunt-contrib-clean'
  
  grunt.registerMultiTask 'server',' server dev', ->
    grunt.log.writeln "#{@target}: #{@data}"
    
  grunt.registerTask 'default', ['coffeelint']